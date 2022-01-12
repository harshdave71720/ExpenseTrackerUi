import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category, ICategory } from 'src/entities/category';
import { Expense, IExpense } from 'src/entities/expense';

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
        amount : new FormControl(this.expense.amount),
        date : new FormControl(this.expense.date),
        categoryName : new FormControl(this.expense.categoryName),
        description : new FormControl(this.expense.description)
      }
    );
  }

  onAdd() : void {
    if(!this.expenseForm.valid)
      return;
    this.added.emit(this.expenseForm.value);
  }

  onEdit() : void {
    if(!this.expenseForm.valid)
      return;
    this.edited.emit(this.expenseForm.value);
  }
}
