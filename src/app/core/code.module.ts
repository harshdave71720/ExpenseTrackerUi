import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SecurityService } from "./security.service";

@NgModule({
  imports : [ CommonModule ],
  declarations: [],
  exports : [],
  providers : [ SecurityService ]
})
export class CoreModule{}
