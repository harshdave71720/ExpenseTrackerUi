import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { IExpense } from '../../expense.model';
import { ICategory } from '../../../shared/models/category.model';
import { ExpenseService } from '../../expense.service';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html'
})
export class ExpenseComponent implements OnInit {
  @Input() expense : IExpense;
  @Output() refreshExpensesEvent = new EventEmitter<void>();
  @Input() categories : ICategory[] = [];
  editMode : boolean = false;

  constructor(private readonly expenseService : ExpenseService) { }

  ngOnInit(): void {
  }

  async delete() : Promise<void>{
    let response = confirm("Are you sure you want to delete the expense?");
    if(!response)
      return;
    await this.expenseService.delete(this.expense.id);
    this.refreshExpensesEvent.emit();
  }

  async editClicked() : Promise<void>
  {
    this.editMode = true;
  }

  async save() : Promise<void>
  {
    this.expense = await this.expenseService.updateExpense(this.expense);
    this.editMode = false;
  }

  onEdit(exp : IExpense)
  {
    this.expense = exp;
    this.save();
  }
}
