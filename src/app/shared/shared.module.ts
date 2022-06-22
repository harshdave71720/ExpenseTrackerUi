import { NgModule } from "@angular/core";

import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports : [ToastrModule.forRoot()],
  declarations: [],
  exports : [ToastrModule]
})
export class SharedModule {}
