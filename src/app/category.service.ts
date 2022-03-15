import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, ICategory } from 'src/entities/category';
import { IResponse } from '../entities/Response';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from './services/error.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient : HttpClient, private readonly errorService : ErrorService) { }

  async getCategories() : Promise<ICategory[]>{
    return await this.httpClient.get<IResponse<ICategory[]>>("https://localhost:5001/category")
    .pipe(map(r => r.data), catchError(this.errorService.handleError)).toPromise();
  }

  async saveCategory(category : Category) : Promise<ICategory>
  {
    return await this.httpClient.post<IResponse<ICategory>>("https://localhost:5001/category", category)
      .pipe(
        map(c => c.data),
        catchError(this.errorService.handleError)
      ).toPromise();
  }

  async deleteCategory(name : string) : Promise<ICategory>
  {
    return await this.httpClient.delete<IResponse<ICategory>>("https://localhost:5001/category/" + name)
    .pipe(
      map(c => c.data),
      catchError(this.errorService.handleError)
    ).toPromise();
  }

}
