import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, of } from "rxjs";
import { ApplicationUser } from "src/entities/applicationUser";
import { UserRegister } from "src/entities/userRegister";
import jwt_decode from 'jwt-decode';
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { IResponse } from "src/entities/Response";

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

    this.httpClient.post<IResponse<any>>(`${this.baseUrl}/user/register`, user)
    .pipe(catchError(this.handleError))
    .subscribe(() => this.login(user.email, user.password, returnUrl));
  }

  private GetTokenAndUserInfo(credentials : object) : Observable<ApplicationUser | undefined> {
    return this.httpClient.post<IResponse<TokenResponse>>(`${this.baseUrl}/user/token`, credentials)
      .pipe(
        map(t => {
          if(!t.data.token)
            return undefined;
          return this.decodeToken(t.data.token);
        }),
        catchError(this.handleError)
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

  handleError(error : HttpErrorResponse)
  {
    let response = error.error as IResponse<any>;
    if(response?.errors?.length == 1)
    {
      if(error.status === 0)
      {
        console.log("Cleint Side Error :", response.errors);
      }
      else
      {
        console.log("Backend error : ", response.errors);
      }
    }
    return EMPTY;
  }

}


class TokenResponse {
  token : string;
}
