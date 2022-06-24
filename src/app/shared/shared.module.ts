import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from "@angular/common";

@NgModule({
  imports : [ToastrModule.forRoot(), CommonModule, ReactiveFormsModule],
  declarations: [],
  exports : [ToastrModule, ReactiveFormsModule, CommonModule]
})
export class SharedModule {}
