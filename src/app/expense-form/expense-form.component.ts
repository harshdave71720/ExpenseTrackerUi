import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category, ICategory } from 'src/entities/category';
import { Expense, IExpense } from 'src/entities/expense';
import { dateInFutureValidator, negativeOrNonZeroValidator } from '../validators/formValidators';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
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
        amount : new FormControl(this.expense.amount,[negativeOrNonZeroValidator()]),
        // date : new FormControl(this.expense.date, [dateInFutureValidator()]),
        date : new FormControl(this.expense.date),
        categoryName : new FormControl(this.expense.categoryName),
        description : new FormControl(this.expense.description)
      }
    );
  }

  onAdd() : void {
    if(!this.expenseForm.valid)
      return;

    let exp : IExpense = this.expenseForm.value;
    exp.id = this.expense.id;
    this.added.emit(exp);
  }

  onEdit() : void {
    if(!this.expenseForm.valid)
      return;

    let exp : IExpense = this.expenseForm.value;
    exp.id = this.expense.id;
    this.edited.emit(exp);
  }
}
