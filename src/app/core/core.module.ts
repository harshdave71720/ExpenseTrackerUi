import { NgModule } from "@angular/core";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { AccessHeaderInterceptor } from "./interceptors/access-header.interceptor";
import { AuthenticationService } from "./services/authentication.service";
import { CategoryService } from "./services/category.service";
import { ErrorService } from "./services/error.service";
import { ExpenseService } from "./services/expense.service";
// import { SharedModule } from "../shared/shared.module";

@NgModule({
  providers : [],
  // imports : [SharedModule]
})
export class CoreModule {

}
