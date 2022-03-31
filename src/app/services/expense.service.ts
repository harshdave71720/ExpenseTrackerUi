import { Injectable } from '@angular/core';
import { IExpense } from 'src/entities/expense';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { IResponse } from 'src/entities/Response';
import { ErrorService } from './error.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private readonly httpClient : HttpClient, private readonly errorService : ErrorService,
              private readonly toastr : ToastrService) { }

  public async addExpense(expense : IExpense) : Promise<IExpense> {
    return await this.httpClient.post<IExpense>(`${environment.apiUrl}/expense`, expense)
    .pipe(
      catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
    )
    .toPromise();
  }

  public async delete(expenseId : number)
  {
    await this.httpClient.delete<IResponse<IExpense>>(`${environment.apiUrl}/Expense/` + expenseId)
      .pipe(
        catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
      )
      .toPromise();
  }

  public get() : Observable<IExpense[]>
  {
    return  this.httpClient.get<IResponse<IExpense[]>>(`${environment.apiUrl}/Expense`)
      .pipe(
        map(r => r.data),
        catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
      );
  }

  public async updateExpense(expense : IExpense) : Promise<IExpense>
  {
    return await this.httpClient.put<IResponse<IExpense>>(`${environment.apiUrl}/Expense`, expense)
    .pipe(
      map(r => r.data),
      catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
    )
    .toPromise();
  }

  public getExpenseCount() : Observable<number>{
    return this.httpClient.get<IResponse<number>>(`${environment.apiUrl}/Expense/count`)
    .pipe(
      map(r => r.data),
      catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
    );
  }

  public getExpensePaged(limit : number, offset : number) : Observable<IExpense[]>
  {
    var params = new HttpParams( { fromString : `limit=${limit}&offset=${offset}&latestFirst=${true}`} );
    return this.httpClient.get<IResponse<IExpense[]>>(`${environment.apiUrl}/Expense/GetPaged`, { params : params })
      .pipe(
        map(r => r.data),
        catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
      );
  }

  uploadExpenses(file : File) {
    let formData = new FormData();
    formData.append("file", file, file.name);
    this.httpClient.post<IResponse<any>>(`${environment.apiUrl}/Expense/Upload`, formData)
    .pipe(
      catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
    )
    .subscribe();
  }
}

