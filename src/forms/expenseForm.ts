import { ContentObserver } from "@angular/cdk/observers";
import { formatDate } from "@angular/common";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Expense, IExpense } from "src/entities/expense";

export class ExpenseForm
{
    constructor(expense : IExpense) {
        this.amount = new FormControl(null, [Validators.required, negativeOrNonZeroValidator()]);
        this.date = new FormControl();
        this.description = new FormControl();
        this.categoryName = new FormControl();

        this.form = new FormGroup(
            {
                amount : this.amount,
                date : this.date,
                description : this.description,
                categoryName : this.categoryName
            });

        this.initializeValues(expense);
    }

    form : FormGroup;
    date : FormControl;
    amount : FormControl;
    description : FormControl;
    categoryName : FormControl;

    get IsInvalid() { return this.form.invalid}

    private initializeValues(expense : IExpense) : void
    {
        this.amount.setValue(expense.amount);
        this.date.setValue(formatDate(expense?.date, 'yyyy-MM-dd', 'en'))
        this.description.setValue(expense?.description);
        this.categoryName.setValue(expense?.categoryName);
    }

    refresh()
    {
        this.form.reset();
        this.initializeValues(new Expense());
    }

    getExpense() : Expense
    {
        let expense = new Expense();
        expense.amount = this.amount.value;
        expense.date = this.date.value;
        expense.description = this.description.value;
        expense.categoryName = this.categoryName.value;
        return expense;
    }

    
}

function negativeOrNonZeroValidator() : ValidatorFn
{
    return (control : AbstractControl) : ValidationErrors | null => 
    {
        let notPositive = control.value <= 0;
        return notPositive ? {negativeOrNonZero : {value : "Should Be Positive"}} : null;
    }
}