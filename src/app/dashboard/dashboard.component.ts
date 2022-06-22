import { Component, OnInit } from "@angular/core";

import { ICategory } from "src/app/shared/category.model";

@Component({
  selector : 'app-dashboard',
  templateUrl : './dashboard.component.html'
})
export class DashBoardComponent {
  categories : ICategory[] = [];

  constructor() {}

  refreshCategories(categories : ICategory[]) : void {
    this.categories = categories;
  }
}
