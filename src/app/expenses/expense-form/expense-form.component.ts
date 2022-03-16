import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICategory } from 'src/entities/category';
import { Expense, IExpense } from 'src/entities/expense';
import { dateInFutureValidator, negativeOrNonZeroValidator } from '../../validators/formValidators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html'
})
export class ExpenseFormComponent implements OnInit {
  @Input() expense : IExpense = new Expense();
  @Input() categories : ICategory[];
  @Input() editMode : boolean = false;

  @Output() edited : EventEmitter<IExpense> = new EventEmitter<IExpense>();
  @Output() added : EventEmitter<IExpense> = new EventEmitter<IExpense>();

  expenseForm : FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.expenseForm = new FormGroup(
      {
        amount : new FormControl(this.expense?.amount,[negativeOrNonZeroValidator()]),
        date : new FormControl(formatDate(this.expense?.date, 'yyyy-MM-dd', 'en'), [dateInFutureValidator()]),
        categoryName : new FormControl(this.expense?.categoryName),
        description : new FormControl(this.expense?.description)
      }
    );
  }

  onAdd() : void {
    if(!this.expenseForm.valid)
      return;

    let exp : IExpense = this.getExpenseFromForm();
    this.added.emit(exp);
  }

  onEdit() : void {
    if(!this.expenseForm.valid)
      return;

    let exp = this.getExpenseFromForm();
    this.edited.emit(exp);
  }

  private getExpenseFromForm() : IExpense
  {
    let expense : IExpense = this.expenseForm.value;
    expense.id = this.expense?.id;
    expense.categoryName = expense.categoryName === "null" ? null : expense.categoryName;
    return expense;
  }
}
