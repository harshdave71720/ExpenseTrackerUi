import { Routes } from "@angular/router";
import { CategoriesComponent } from "./category/components/categories/categories.component";
import { AuthenticationGuard } from "./core/authenticationGuard";
import { DashBoardComponent } from "./dashboard/dashboard.component";
import { ExpensesComponent } from "./expense/components/expenses/expenses.component";

export const routes : Routes = [
  { path : '', redirectTo : '/home', pathMatch : 'full'},
  { path : 'users', loadChildren : () => import('./user/user.module').then(m => m.UserModule) },
  { path : 'home', component : DashBoardComponent, canActivate : [AuthenticationGuard]},
  { path : 'expenses/paged', component : ExpensesComponent, canActivate : [AuthenticationGuard]},
  { path : 'categories', component : CategoriesComponent, canActivate : [AuthenticationGuard]}
];
