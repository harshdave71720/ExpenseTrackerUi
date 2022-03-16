import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ExpensesComponent } from './expenses/expenses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { ExpenseFormComponent } from './expenses/expense-form/expense-form.component';
import { CategoryService } from './services/category.service';
import { ExpenseService } from './services/expense.service';
import { SecurityService } from './services/security.service';
import { LoginComponent } from './shared/login/login.component';
import { AuthenticationGuard } from './shared/guards/authenticationGuard';
import { AccessHeaderInterceptor } from './shared/interceptors/accessHeaderInterceptor';
import { ErrorService } from './services/error.service';
import { ToastrModule } from 'ngx-toastr';
import { ExpenseComponent } from './expenses/expense/expense.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    ExpensesComponent,
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
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  //providers: [{provide: "ICategoryService", useClass: CategoryService}],
  providers : [ CategoryService, ExpenseService, SecurityService, AuthenticationGuard,
                {
                  provide : HTTP_INTERCEPTORS,
                  useClass : AccessHeaderInterceptor,
                  multi : true
                },
                ErrorService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
