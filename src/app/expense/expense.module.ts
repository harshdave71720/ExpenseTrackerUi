import { NgModule } from "@angular/core";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { ExpenseFormComponent } from "./components/expense-form/expense-form.component";
import { ExpenseComponent } from "./components/expense/expense.component";
import { ExpensesComponent } from "./components/expenses/expenses.component";

@NgModule({
  declarations: [ExpensesComponent, ExpenseComponent, ExpenseFormComponent],
  exports : [ExpensesComponent],
  imports: [SharedModule, CoreModule]
})
export class ExpenseModule {}
