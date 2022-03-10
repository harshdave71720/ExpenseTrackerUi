import { Component, Inject, OnInit } from '@angular/core';
import { IExpense } from 'src/entities/expense';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { ICategory } from 'src/entities/category';
import { CategoryService, ICategoryService } from '../category.service';
import { ExpenseService } from '../expense.service';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  readonly baseAddress : string = "https://localhost:5001/";
  expenses : IExpense[] = [];
  categories : ICategory[] = [];
  newSelected : boolean = false;

  constructor(private client : HttpClient,
                private categoryService : CategoryService,
                private readonly expenseSerivice : ExpenseService) { }

   ngOnInit(): void {
    this.expenseSerivice.get().subscribe(e => { console.log("Data Reeturned"); this.expenses = e; });
    // this.categories = await this.categoryService.getCategories();
  }

  newClicked() : void {
    this.newSelected = this.newSelected ? false : true;
  }

  addCategory() : void
  {
    this.categories.push({
      name: "NewlyAdded"
    });
  }

  refreshExpenses() : void
  {
    this.client.get<IExpense[]>(this.baseAddress+"expense").subscribe(result => this.expenses = result);
  }
}
