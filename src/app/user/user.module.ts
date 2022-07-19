import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
// import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [ SharedModule,
    RouterModule.forChild([
      { path: '', component : LoginComponent },
      { path: 'login', component : LoginComponent }
    ])],
  declarations : [ LoginComponent ]
})
export class UserModule { }
