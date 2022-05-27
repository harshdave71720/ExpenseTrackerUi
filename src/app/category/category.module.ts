import { NgModule } from "@angular/core";
import { CategoriesComponent } from "./components/categories/categories.component";
import { CategoryComponent } from "./components/category/category.component";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { ExpenseModule } from "../expense/expense.module";
import { ExpenseComponent } from "../expense/components/expense/expense.component";
import { ExpensesComponent } from "../expense/components/expenses/expenses.component";

@NgModule({
  declarations : [CategoriesComponent, CategoryComponent],
  imports : [CoreModule, SharedModule, ExpenseModule, ExpensesComponent]
})
export class CategoryModule {

}
