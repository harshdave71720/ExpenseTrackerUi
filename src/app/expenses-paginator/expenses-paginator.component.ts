import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Expense, IExpense } from 'src/entities/expense';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
import { ICategory } from 'src/entities/category';
import { CategoryService } from '../category.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-expenses-paginator',
  templateUrl: './expenses-paginator.component.html',
  styleUrls: ['./expenses-paginator.component.css']
})
export class ExpensesPaginatorComponent implements OnInit {
  @Input() categories : ICategory[];
  expenses : IExpense[] = [];
  newExpenseSelected : boolean = false;
  totalCount : number = 0;
  pageSize : number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly expenseService : ExpenseService, private categoryService : CategoryService) {
  }

  async ngOnInit(): Promise<void> {
    if(!this.categories)
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

  async onAdd(exp : IExpense) : Promise<void>
  {
    await this.expenseService.addExpense(exp);
    await this.refreshExpenses();
  }
}
