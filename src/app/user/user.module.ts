import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
// import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [SharedModule, CommonModule, RouterModule, CommonModule],
  declarations : [ LoginComponent ]
})
export class UserModule { }
