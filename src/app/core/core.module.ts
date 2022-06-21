import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SecurityService } from "./security.service";
import { ErrorService } from "./error.service";

@NgModule({
  imports : [ CommonModule ],
  declarations: [],
  exports : [],
  providers : [ SecurityService, ErrorService ]
})
export class CoreModule{}
