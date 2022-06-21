import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CategoryService } from '../category-feature/category.service';
import { ICategory } from '../models/category.model';
import { CategoryForm } from 'src/app/category/categoryForm';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories : ICategory[];
  categoryForm : CategoryForm;
  newCategory : ICategory;
  @Output() categoriesRefreshed : EventEmitter<ICategory[]> = new EventEmitter<ICategory[]>();

  constructor(private readonly categoryService : CategoryService) {
    this.categoryForm = new CategoryForm(this.newCategory);
  }

  async ngOnInit(): Promise<void> {
    this.refreshCategories();
  }

  async addCategory() : Promise<void>
  {
    if(this.categoryForm.form.invalid)
    {
      this.categoryForm.form.markAllAsTouched();
      this.categoryForm.form.updateValueAndValidity();
      return;
    }

    await this.categoryService.saveCategory(this.categoryForm.getCategory());
    await this.refreshCategories();
  }

  async refreshCategories()
  {
    this.categories = await this.categoryService.getCategories();
    this.categoriesRefreshed.emit(this.categories);
  }
}
