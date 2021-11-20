import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ICategory } from 'src/entities/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : ICategory[];

  constructor(private readonly categoryService : CategoryService) { }

  async ngOnInit(): Promise<void> {
    this.categories = await this.categoryService.getCategories();
  }

}
