import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpensesComponent } from './expense/components/expenses/expenses.component';
import { CategoriesComponent } from './category/components/categories/categories.component';
import { LoginComponent } from './core/login/login.component';
import { AuthenticationGuard } from './core/authenticationGuard';
import { DashBoardComponent } from './dashboard/dashboard.component';

const routes : Routes = [
  { path : '', redirectTo : '/home', pathMatch : 'full'},
  { path : 'home', component : DashBoardComponent, canActivate : [AuthenticationGuard]},
  { path : 'expenses/paged', component : ExpensesComponent, canActivate : [AuthenticationGuard]},
  { path : 'categories', component : CategoriesComponent, canActivate : [AuthenticationGuard]},
  { path : 'login', component : LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
