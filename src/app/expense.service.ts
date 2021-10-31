import { Injectable } from '@angular/core';
import { Expense, IExpense } from 'src/entities/expense';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

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

  public async get() : Promise<IExpense[]>
  {
    return await this.httpClient.get<IExpense[]>("https://localhost:5001/Expense").toPromise();
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
    return this.httpClient.get<IExpense[]>("https://localhost:5001/Expense/GetPaged", { params : params })
            //.pipe(catchError(this.handleError));
  } 

  
  handleError(error : HttpErrorResponse)
  {
    if(error.status === 0)
    {
      console.error("Cleint Side Error :", error.error);
    }
    else
    {
      console.error("Backend error : ", error.error);
    }

    return throwError("An error occurred");
  }
}

