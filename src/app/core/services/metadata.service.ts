import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { IResponse } from "src/app/shared/models/response.model";
import { ErrorService } from "./error.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class MetaDataService {
  readonly categoryNames$ : BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private readonly httpClient : HttpClient,
              private readonly errorService : ErrorService,
              private readonly toastr : ToastrService
              ) {
                this.refreshCategoryNames();
  }

  refreshCategoryNames() : void {
    this.httpClient.get<IResponse<string[]>>(`${environment.apiUrl}/category/names`)
      .pipe(
        map(r => r.data),
        catchError((error : HttpErrorResponse) => this.errorService.handleError(error, this.toastr))
      ).subscribe(names => {
        this.categoryNames$.next(names);
      });
  }
}
