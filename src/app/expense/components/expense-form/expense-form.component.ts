import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

import { ICategory } from '../../../category/category.model';
import { IExpense } from '../../expense.model';
import { dateInFutureValidator, negativeOrNonZeroValidator } from '../../../shared/formValidators';


@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html'
})
export class ExpenseFormComponent implements OnInit {
  @Input() expense : IExpense;
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
        amount : new FormControl(this.expense?.amount ?? 0,[negativeOrNonZeroValidator()]),
        date : new FormControl(formatDate(this.expense?.date ?? new Date(Date.now()), 'yyyy-MM-dd', 'en'), [dateInFutureValidator()]),
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
