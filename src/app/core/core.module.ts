import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { SecurityService } from "./services/security.service";
import { ErrorService } from "./services/error.service";
import { AuthenticationGuard } from "./authenticationGuard";
import { AccessHeaderInterceptor } from "./accessHeaderInterceptor";
import { SharedModule } from "../shared/shared.module";
import { MetaDataService } from "./services/metadata.service";


@NgModule({
  imports : [ SharedModule ],
  declarations: [],
  exports : [ ],
  providers : [ SecurityService, ErrorService, AuthenticationGuard, MetaDataService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AccessHeaderInterceptor,
      multi : true
    }]
})
export class CoreModule{}
