import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports : [ToastrModule.forRoot()],
  declarations: [],
  exports : [ToastrModule, ReactiveFormsModule]
})
export class SharedModule {}
