import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { IResponse } from "src/entities/Response";

@Injectable()
export class ErrorService {
  handleError(errorResponse : HttpErrorResponse)
  {
    if(errorResponse.status === 0)
    {
      console.log("Cleint Side Error :", errorResponse.error);
      return EMPTY;
    }
    let response = errorResponse.error as IResponse<any>;
    if(response?.errors)
    {
      for(let errorMessage of response.errors)
      {
        console.log("Error Message : " + errorMessage);
      }
    }
    else
    {
      console.log("Unknown Error Occurred");
    }
    return EMPTY;
  }
}
