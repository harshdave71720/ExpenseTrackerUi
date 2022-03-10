import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, ICategory } from 'src/entities/category';
import { IResponse } from '../entities/Response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService { //implements ICategoryService
  constructor(private httpClient : HttpClient) { }

  async getCategories() : Promise<ICategory[]>{
    return await this.httpClient.get<IResponse<ICategory[]>>("https://localhost:5001/category").pipe(map(r => r.data)).toPromise();
  }

  async saveCategory(category : Category) : Promise<ICategory>
  {
    return await this.httpClient.post<ICategory>("https://localhost:5001/category", category).toPromise();
  }

  async deleteCategory(name : string) : Promise<ICategory>
  {
    return await this.httpClient.delete<ICategory>("https://localhost:5001/category/" + name).toPromise();
  }
}

export interface ICategoryService{
  getCategories() : Promise<ICategory[]>;
}
