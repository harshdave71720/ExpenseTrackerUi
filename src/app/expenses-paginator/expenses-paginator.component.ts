import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Expense, IExpense } from 'src/entities/expense';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
import { ICategory } from 'src/entities/category';
import { ThrowStmt } from '@angular/compiler';
import { CategoryService } from '../category.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseForm } from 'src/forms/expenseForm';

@Component({
  selector: 'app-expenses-paginator',
  templateUrl: './expenses-paginator.component.html',
  styleUrls: ['./expenses-paginator.component.css']
})
export class ExpensesPaginatorComponent implements OnInit {
  categories : ICategory[] = [];
  expenses : IExpense[] = [];
  expenseForm : ExpenseForm;
  newExpenseSelected : boolean = false;
  totalCount : number = 0;
  pageSize : number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly expenseService : ExpenseService, private categoryService : CategoryService) {
    this.expenseForm = new ExpenseForm(new Expense());
  }

  async ngOnInit(): Promise<void> {
    this.categories = await this.categoryService.getCategories();
    this.expenses = await this.expenseService.getExpensePaged(this.pageSize, 0).toPromise();
    this.expenseService.getExpenseCount().subscribe(count => this.totalCount = count);
  }

  async refreshExpenses()
  {
    this.expenses = await this.expenseService.getExpensePaged(this.pageSize, 0).toPromise();
    this.expenseService.getExpenseCount().subscribe(count => this.totalCount = count);
    this.paginator.pageIndex = 0;
  }

  onPageChange(event : PageEvent)
  {
    this.pageSize = event.pageSize;
    let offset = event.pageIndex * event.pageSize;
    let e = this.expenseService.getExpensePaged(event.pageSize, offset)
    e.subscribe(expenses => this.expenses = expenses);
  }

  newClicked() : void
  {
    this.newExpenseSelected = !this.newExpenseSelected;
  }

  async addExpenseClicked() : Promise<void>
  {
    if(this.expenseForm.IsInvalid)
    {
      this.expenseForm.form.markAllAsTouched();
      this.expenseForm.form.updateValueAndValidity();
      return;
    }

    // console.log(this.expenseForm.getExpense());
    // this.expenseForm.form.reset();

    await this.expenseService.addExpense(this.expenseForm.getExpense());
    await this.refreshExpenses();
    this.newClicked();
    this.expenseForm.refresh();
  }
}
