import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category, ICategory } from 'src/entities/category';
import { IResponse } from '../entities/Response';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient : HttpClient) { }

  async getCategories() : Promise<ICategory[]>{
    return await this.httpClient.get<IResponse<ICategory[]>>("https://localhost:5001/category")
    .pipe(map(r => r.data), catchError(this.handleError)).toPromise();
  }

  async saveCategory(category : Category) : Promise<ICategory>
  {
    return await this.httpClient.post<IResponse<ICategory>>("https://localhost:5001/category", category)
      .pipe(
        map(c => c.data),
        catchError(this.handleError)
      ).toPromise();
  }

  async deleteCategory(name : string) : Promise<ICategory>
  {
    return await this.httpClient.delete<IResponse<ICategory>>("https://localhost:5001/category/" + name)
    .pipe(
      map(c => c.data),
      catchError(this.handleError)
    ).toPromise();
  }

  handleError(error : HttpErrorResponse)
  {
    let response = error.error as IResponse<any>;
    if(response?.errors?.length == 1)
    {
      if(error.status === 0)
      {
        console.log("Cleint Side Error :", response.errors);
      }
      else
      {
        console.log("Backend error : ", response.errors);
      }
    }
    return EMPTY;
  }
}
