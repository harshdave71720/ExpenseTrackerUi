import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function negativeOrNonZeroValidator() : ValidatorFn
{
    return (control : AbstractControl) : ValidationErrors | null =>
    {
        let notPositive = control.value <= 0;
        return notPositive ? {negativeOrNonZero : {value : "Should Be Positive"}} : null;
    }
}


export function dateInFutureValidator() : ValidatorFn
{
  return (control : AbstractControl) : ValidationErrors | null => {
    let selectedDate : Date = new Date(control.value);
    return selectedDate > new Date(Date.now()) ? { dateInFuture : { value : "Date in future"} } : null;
  }
}
