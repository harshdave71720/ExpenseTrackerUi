import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category, ICategory } from '../models/category';
import { IResponse } from '../models/IResponse';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient : HttpClient, private readonly errorService : ErrorService,
              private readonly toastr : ToastrService) { }

  async getCategories() : Promise<ICategory[]>{
    return await this.httpClient.get<IResponse<ICategory[]>>(`${environment.apiUrl}/category`)
    .pipe(map(r => r.data),
    catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
    )
     .toPromise();
  }

  async saveCategory(category : Category) : Promise<ICategory>
  {
    return await this.httpClient.post<IResponse<ICategory>>(`${environment.apiUrl}/category`, category)
      .pipe(
        map(c => c.data),
        catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
      ).toPromise();
  }

  async deleteCategory(name : string) : Promise<ICategory>
  {
    return await this.httpClient.delete<IResponse<ICategory>>(`${environment.apiUrl}/category/` + name)
    .pipe(
      map(c => c.data),
      catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
    ).toPromise();
  }

}
