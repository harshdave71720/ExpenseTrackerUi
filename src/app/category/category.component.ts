import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from 'src/entities/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category : ICategory;
  constructor() { }

  ngOnInit(): void {
  }

}
