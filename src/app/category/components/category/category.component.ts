import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ICategory } from '../../category.model';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  @Input() category : ICategory;
  @Input() categoryName : string;
  @Output() deleted : EventEmitter<void> = new EventEmitter<void>();
  constructor(readonly categoryService : CategoryService) { }

  ngOnInit(): void {
  }

  async delete(): Promise<void>
  {
    await this.categoryService.deleteCategory(this.categoryName);
    this.deleted.emit();
  }
}
