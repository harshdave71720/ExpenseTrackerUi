import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { SecurityService } from "src/app/core/services/security.service";

@Injectable()
export class AccessHeaderInterceptor implements HttpInterceptor{

  constructor(private readonly securityService : SecurityService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = this.securityService.getLoggedInUser();
    if(!user)
      return next.handle(req);

    let header = new HttpHeaders().set('Authorization', 'Bearer ' + user.bearerToken);
    req = req.clone({ headers : header });
    return next.handle(req);
  }

}
