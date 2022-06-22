import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CategoryService } from '../../category.service';
import { ICategory } from '../../category.model';
import { CategoryForm } from 'src/app/category/components/category/categoryForm';
import { MetaDataService } from 'src/app/core/services/metadata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categoryForm : CategoryForm;
  newCategory : ICategory;

  constructor(private readonly categoryService : CategoryService
              ,readonly metadataService : MetaDataService) {}

  ngOnInit(): void {
    this.categoryForm = new CategoryForm(this.newCategory);
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
    this.metadataService.refreshCategoryNames();
  }

  refreshCategories() : void {
    this.metadataService.refreshCategoryNames();
  }
}
