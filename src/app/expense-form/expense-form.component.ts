import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category, ICategory } from 'src/entities/category';
import { Expense } from 'src/entities/expense';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  @Input() expense : Expense = new Expense();
  @Input() categories : ICategory[];
  form : FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        amount : new FormControl(this.expense.amount),
        date : new FormControl(this.expense.date),
        categoryName : new FormControl(this.expense.categoryName),
        description : new FormControl(this.expense.description)
      }
    );
  }

  onSubmit() : void {
    let e : Expense = this.form.value;
  }
}
