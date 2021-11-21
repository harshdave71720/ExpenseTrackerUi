import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, ICategory } from 'src/entities/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService { //implements ICategoryService 
  constructor(private httpClient : HttpClient) { }

  async getCategories() : Promise<ICategory[]>{
    return await this.httpClient.get<ICategory[]>("https://localhost:5001/category").toPromise();
  }

  async saveCategory(category : Category) : Promise<ICategory>
  {
    return await this.httpClient.post<ICategory>("https://localhost:5001/category", category).toPromise();
  }
}

export interface ICategoryService{
  getCategories() : Promise<ICategory[]>;
}