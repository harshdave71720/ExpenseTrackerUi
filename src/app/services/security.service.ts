import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ApplicationUser } from "src/entities/applicationUser";
import { UserRegister } from "src/entities/userRegister";
import jwt_decode from 'jwt-decode';
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { IResponse } from "src/entities/Response";
import { ErrorService } from "./error.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class SecurityService {
  jwt_key : string = "JWT_TOKEN";
  user : ApplicationUser;
  baseUrl : string = "https://localhost:5001";
  user$ = new Subject<ApplicationUser>();

  constructor(private readonly httpClient : HttpClient, private readonly router : Router
              , private readonly errorService : ErrorService
              , private readonly toastr : ToastrService){}

  login(email : string, password : string, returnUrl : string) {
    let token = localStorage.getItem(this.jwt_key);
    if(token)
    {
      let user = this.decodeToken(token);
      this.user$.next(user);
      if(user)
        throw Error(`User ${user.firstname} Is Already Logged In, Please Log Out First`);
    }

    this.GetTokenAndUserInfo({ email : email, password : password })
      .subscribe(user => {
        this.user = user;
        this.user$.next(user);
        localStorage.setItem(this.jwt_key, user.bearerToken);
        this.toastr.success("Logged in successfully");
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
    .pipe(
      catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
    )
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
        catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
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
    {
      if(!this.isTokenValid(token))
      {
        localStorage.removeItem(this.jwt_key);
        this.user$.next(undefined);
      } else {
        return this.decodeToken(token);
      }
    }
    return undefined;
  }

  private redirect(returnUrl : string) : void {
     if(returnUrl)
        this.router.navigate([returnUrl]);
      else
        this.router.navigate(['']);
  }

  private isTokenValid(token : string) : boolean {
    let jwt: { [key: string]: string } = jwt_decode(token);
    return (+jwt.exp) * 1000 >= Date.now();
  }
}

class TokenResponse {
  token : string;
}
