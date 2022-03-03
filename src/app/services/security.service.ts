import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApplicationUser } from "src/entities/applicationUser";
import { UserRegister } from "src/entities/userRegister";
import jwt_decode from 'jwt-decode';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class SecurityService {
  jwt_key : string = "JWT_TOKEN";
  user : ApplicationUser;
  baseUrl : string = "https://localhost:5001";

  constructor(private readonly httpClient : HttpClient, private readonly router : Router){}

  login(email : string, password : string, returnUrl : string) {
    let token = localStorage.getItem(this.jwt_key);
    if(token)
    {
      let user = this.decodeToken(token);
      if(user)
        throw Error(`User ${user.firstname} Is Already Logged In, Please Log Out First`);
    }

    this.GetTokenAndUserInfo({ email : email, password : password })
      .subscribe(user => {
        this.user = user;
        localStorage.setItem(this.jwt_key, user.bearerToken);
        this.redirect(returnUrl);
      });
  }

  logout() {
    localStorage.removeItem(this.jwt_key);
    this.router.navigate(['login']);
  }

  register(user : UserRegister, returnUrl : string) {
    if(this.user)
      throw Error(`User ${this.user.firstname} is already logged in. Please logout first`);

    this.httpClient.post(`${this.baseUrl}/user/register`, user)
    .subscribe(() => this.login(user.email, user.password, returnUrl));
  }

  private GetTokenAndUserInfo(credentials : object) : Observable<ApplicationUser | undefined> {
    return this.httpClient.post<TokenResponse>(`${this.baseUrl}/user/token`, credentials)
      .pipe(
        map(t => {
          if(!t.token)
            return undefined;
          return this.decodeToken(t.token);
        })
      );
  }

  private decodeToken(token : string) : ApplicationUser {
    let jwt: { [key: string]: string } = jwt_decode(token);
    let user = new ApplicationUser();
    user.firstname = jwt.FirstName;
    user.lastname = jwt.LastName;
    user.bearerToken = token;
    return user;
  }

  public getLoggedInUser() : ApplicationUser {
    let token = localStorage.getItem(this.jwt_key);
    if(token)
      return this.decodeToken(token);
    return undefined;
  }

  private redirect(returnUrl : string) : void {
     if(returnUrl)
        this.router.navigate([returnUrl]);
      else
        this.router.navigate(['']);
  }

}

class TokenResponse {
  token : string;
}
