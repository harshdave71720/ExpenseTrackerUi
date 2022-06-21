import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from 'src/entities/category';
import { CategoryService } from '../category-feature/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  @Input() category : ICategory;
  @Output() deleted : EventEmitter<void> = new EventEmitter<void>();
  constructor(readonly categoryService : CategoryService) { }

  ngOnInit(): void {
  }

  async delete(): Promise<void>
  {
    await this.categoryService.deleteCategory(this.category.name);
    this.deleted.emit();
  }
}
