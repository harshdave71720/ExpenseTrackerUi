import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpensesPaginatorComponent } from './expenses-paginator/expenses-paginator.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthenticationGuard } from './shared/guards/authenticationGuard';

const routes : Routes = [
  { path : 'expenses', component : ExpensesComponent, canActivate : [AuthenticationGuard]},
  // { path : 'expenses/:id', component : ExpenseComponent},
  { path : '', redirectTo : '/categories', pathMatch : 'full'},
  { path : 'expenses/paged', component : ExpensesPaginatorComponent, canActivate : [AuthenticationGuard]},
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
