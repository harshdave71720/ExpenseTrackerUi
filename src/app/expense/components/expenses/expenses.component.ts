import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { IExpense } from '../../expense.model';
import { ExpenseService } from '../../expense.service';
import { ICategory } from '../../../shared/models/category.model';
import { CategoryService } from '../../../category/category.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent implements OnInit {
  @Input() categories : ICategory[];
  expenses : IExpense[] = [];
  newExpenseSelected : boolean = false;
  totalCount : number = 0;
  pageSize : number = 0;
  pageSizeOptions : number[] = [10, 15, 30];
  fileToUpload : File = undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly expenseService : ExpenseService) {
  }

  async ngOnInit(): Promise<void> {
    this.pageSize = this.pageSizeOptions[0];
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

  uploadClicked() : void {
    if(!this.fileToUpload)
      return;
    this.expenseService.uploadExpenses(this.fileToUpload);
  }

  fileChanged(event : Event) : void {
    var element = event.target as HTMLInputElement;
    if(element.files && element.files.length > 0)
    {
      this.fileToUpload = element.files[0];
    }
  }
}
