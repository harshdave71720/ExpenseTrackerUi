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
    await this.httpClient.delete("https://localhost:5001/Expense/" + expenseId).toPromise();
  }

  public get() : Observable<IExpense[]>
  {
    console.log("Calling API");
    return  this.httpClient.get<IResponse<IExpense[]>>("https://localhost:5001/Expense", { observe : 'response' })
      .pipe(
        // tap(r => console.log(r)),
        map(r => r.body.data),
        catchError(this.handleError));
  }

  public async updateExpense(expense : IExpense) : Promise<IExpense>
  {
    return await this.httpClient.put<IExpense>("https://localhost:5001/Expense", expense).toPromise();
  }

  public getExpenseCount() : Observable<number>{
    return this.httpClient.get<number>("https://localhost:5001/Expense/count");
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
    console.log("Handle Error Called");
    if(error.status === 0)
    {
      console.log("Cleint Side Error :", error.error.Errors);
    }
    else
    {
      console.log("Backend error : ", error.error.Errors);
    }

    return EMPTY;
  }
}

