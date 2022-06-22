import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import jwt_decode from 'jwt-decode';
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { IApplicationUser } from "../shared/models/application-user.model";
import { IUserRegister } from "./user-register.model";
import { IResponse } from "../shared/models/response.model";
import { ErrorService } from "./error.service";
import { environment } from "src/environments/environment";

@Injectable()
export class SecurityService {
  jwt_key : string = "JWT_TOKEN";
  user : IApplicationUser;
  user$ = new Subject<IApplicationUser>();

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

  register(user : IUserRegister, returnUrl : string) {
    if(this.user)
      throw Error(`User ${this.user.firstname} is already logged in. Please logout first`);
    this.httpClient.post<IResponse<any>>(`${environment.apiUrl}/user/register`, user)
    .pipe(
      catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
    )
    .subscribe(() => this.login(user.email, user.password, returnUrl));
  }

  private GetTokenAndUserInfo(credentials : object) : Observable<IApplicationUser | undefined> {
    return this.httpClient.post<IResponse<TokenResponse>>(`${environment.apiUrl}/user/token`, credentials)
      .pipe(
        map(t => {
          if(!t.data.token)
            return undefined;
          return this.decodeToken(t.data.token);
        }),
        catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
      );
  }

  private decodeToken(token : string) : IApplicationUser {
    let jwt: { [key: string]: string } = jwt_decode(token);
    let user : IApplicationUser = {
      firstname : jwt?.['FirstName'],
      lastname : jwt?.['LastName'],
      bearerToken : token
    };
    return user;
  }

  public getLoggedInUser() : IApplicationUser {
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
    return (+jwt?.['exp']) * 1000 >= Date.now();
  }
}

class TokenResponse {
  token : string;
}
