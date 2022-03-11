import { Injectable } from '@angular/core';
import { Expense, IExpense } from 'src/entities/expense';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { IResponse } from 'src/entities/Response';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private readonly httpClient : HttpClient) { }

  public async addExpense(expense : IExpense) : Promise<IExpense> {
    // console.log(expense);
    return await this.httpClient.post<IExpense>("https://localhost:5001/expense", expense).toPromise();
  }

  public async delete(expenseId : number)
  {
    await this.httpClient.delete<IResponse<IExpense>>("https://localhost:5001/Expense/" + expenseId)
      .pipe(catchError(this.handleError))
      .toPromise();
  }

  public get() : Observable<IExpense[]>
  {
    console.log("Calling API");
    return  this.httpClient.get<IResponse<IExpense[]>>("https://localhost:5001/Expense")
      .pipe(
        map(r => r.data),
        catchError(this.handleError)
      );
  }

  public async updateExpense(expense : IExpense) : Promise<IExpense>
  {
    return await this.httpClient.put<IResponse<IExpense>>("https://localhost:5001/Expense", expense)
    .pipe(
      map(r => r.data),
      catchError(this.handleError)
    )
    .toPromise();
  }

  public getExpenseCount() : Observable<number>{
    return this.httpClient.get<IResponse<number>>("https://localhost:5001/Expense/count")
    .pipe(
      map(r => r.data),
      catchError(this.handleError)
    );
  }

  public getExpensePaged(limit : number, offset : number) : Observable<IExpense[]>
  {
    var params = new HttpParams( { fromString : `limit=${limit}&offset=${offset}&latestFirst=${true}`} );
    return this.httpClient.get<IResponse<IExpense[]>>("https://localhost:5001/Expense/GetPaged", { params : params })
      .pipe(
        map(r => r.data),
        catchError(this.handleError)
      );
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

