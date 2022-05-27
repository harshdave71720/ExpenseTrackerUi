import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Expense, IExpense } from 'src/app/core/models/expense';
import { ICategory } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { ExpenseService } from 'src/app/core/services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html'
})
export class ExpenseComponent implements OnInit {
  @Input() expense : IExpense = new Expense();
  @Input() newExpense : boolean = false;
  @Input() categories : ICategory[] = [];
  @Output() refreshExpensesEvent = new EventEmitter<void>();
  editOn : boolean = false;

  constructor(private readonly categoryService : CategoryService,
              private readonly expenseService : ExpenseService) { }

  ngOnInit(): void {
  }

  async delete() : Promise<void>{
    let response = confirm("Are you sure you want to delete the expense?");
    if(!response)
      return;
    await this.expenseService.delete(this.expense.id);
    this.refreshExpensesEvent.emit();
  }

  async addExpense() : Promise<void> {
    await this.expenseService.addExpense(this.expense);
    this.refreshExpensesEvent.emit();
    this.newExpense = false;
  }

  async editClicked() : Promise<void>
  {
    this.editOn = true;
  }

  async save() : Promise<void>
  {
    this.expense = await this.expenseService.updateExpense(this.expense);
    this.editOn = false;
  }

  onEdit(exp : IExpense)
  {
    this.expense = exp;
    this.save();
  }

  onAdd(exp : IExpense)
  {
    this.expense = exp;
    this.addExpense();
  }

}
