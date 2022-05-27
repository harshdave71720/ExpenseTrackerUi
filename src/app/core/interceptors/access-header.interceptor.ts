import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AccessHeaderInterceptor implements HttpInterceptor{

  constructor(private readonly authenticationService : AuthenticationService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = this.authenticationService.getLoggedInUser();
    if(!user)
      return next.handle(req);

    let header = new HttpHeaders().set('Authorization', 'Bearer ' + user.bearerToken);
    req = req.clone({ headers : header });
    return next.handle(req);
  }

}
