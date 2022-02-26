import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ExpenseComponent } from './expense/expense.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ExpensesPaginatorComponent } from './expenses-paginator/expenses-paginator.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { CategoryService } from './category.service';
import { ExpenseService } from './expense.service';
import { SecurityService } from './services/security.service';
import { LoginComponent } from './shared/login/login.component';
import { AuthenticationGuard } from './shared/guards/authenticationGuard';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    ExpenseComponent,
    ExpensesPaginatorComponent,
    CategoriesComponent,
    CategoryComponent,
    ExpenseFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  //providers: [{provide: "ICategoryService", useClass: CategoryService}],
  providers : [CategoryService, ExpenseService, SecurityService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
