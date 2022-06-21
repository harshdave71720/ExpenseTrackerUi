import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';

import { ICategory } from '../models/category.model';
import { IResponse } from '../models/response.model';
import { ErrorService } from '../services/error.service';
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

  async saveCategory(category : ICategory) : Promise<ICategory>
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
