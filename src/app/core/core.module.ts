import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { SecurityService } from "./security.service";
import { ErrorService } from "./error.service";
import { AuthenticationGuard } from "./authenticationGuard";
import { AccessHeaderInterceptor } from "./accessHeaderInterceptor";


@NgModule({
  imports : [ CommonModule ],
  declarations: [],
  exports : [],
  providers : [ SecurityService, ErrorService, AuthenticationGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AccessHeaderInterceptor,
      multi : true
    }]
})
export class CoreModule{}
