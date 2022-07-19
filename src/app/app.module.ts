import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { ExpensesComponent } from './expense/components/expenses/expenses.component';
import { CategoriesComponent } from './category/components/categories/categories.component';
import { CategoryComponent } from './category/components/category/category.component';
import { ExpenseFormComponent } from './expense/components/expense-form/expense-form.component';
import { CategoryService } from './category/category.service';
import { ExpenseService } from './expense/expense.service';
import { ExpenseComponent } from './expense/components/expense/expense.component';
import { CoreModule } from './core/core.module';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    ExpensesComponent,
    CategoriesComponent,
    CategoryComponent,
    ExpenseFormComponent,
    DashBoardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    CoreModule,
    SharedModule
  ],
  providers : [ CategoryService, ExpenseService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
