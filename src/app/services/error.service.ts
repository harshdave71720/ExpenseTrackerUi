import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EMPTY } from "rxjs";
import { IResponse } from "src/entities/Response";

@Injectable()
export class ErrorService {
  constructor(private readonly toastr : ToastrService, private readonly router : Router){}

  handleError(errorResponse : HttpErrorResponse, toastr : ToastrService = null)
  {
    if(errorResponse.status == 401)
    {
      this.router.navigate(['login']);
    }
    let response = errorResponse.error as IResponse<any>;
    if(errorResponse.status != 0 && response?.errors)
    {
      for(let errorMessage of response.errors)
      {
        this.toastr.error(errorMessage);
      }
    }
    else
    {
      this.toastr.error("Unknown Error Occurred");
    }
    return EMPTY;
  }
}
