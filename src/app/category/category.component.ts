import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from 'src/entities/category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category : ICategory;
  constructor(readonly categoryService : CategoryService) { }

  ngOnInit(): void {
  }

  async delete(): Promise<void>
  {
    await this.categoryService.deleteCategory(this.category.name);
  }
}
