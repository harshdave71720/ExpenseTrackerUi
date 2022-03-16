import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SecurityService } from "src/app/services/security.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly securityService : SecurityService, private readonly router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.securityService.getLoggedInUser())
    {
      return true;
    }

    this.router.navigate(['login'], { queryParams : { returnUrl : state.url } });
    return false;
  }

}
