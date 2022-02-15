import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpensesPaginatorComponent } from './expenses-paginator/expenses-paginator.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './shared/login/login.component';

const routes : Routes = [
  { path : 'expenses', component : ExpensesComponent},
  // { path : 'expenses/:id', component : ExpenseComponent},
  { path : '', redirectTo : '/categories', pathMatch : 'full'},
  { path : 'expenses/paged', component : ExpensesPaginatorComponent},
  { path : 'categories', component : CategoriesComponent},
  { path : 'login', component : LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
