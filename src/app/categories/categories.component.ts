import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ICategory, Category } from 'src/entities/category';
import { CategoryForm } from 'src/forms/categoryForm';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : ICategory[];
  categoryForm : CategoryForm;
  newCategory : ICategory = new Category('');

  constructor(private readonly categoryService : CategoryService) {
    this.categoryForm = new CategoryForm(this.newCategory);
  }

  async ngOnInit(): Promise<void> {
    this.categories = await this.categoryService.getCategories();
  }

  async addCategory() : Promise<void> 
  {
    await this.categoryService.saveCategory(this.categoryForm.getCategory());
  }
}
