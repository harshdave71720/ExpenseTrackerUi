import { Component, Input, OnInit } from '@angular/core';
import { Expense } from 'src/entities/expense';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  @Input() expense : Expense = new Expense();
  constructor() { }

  ngOnInit(): void {
  }
}
