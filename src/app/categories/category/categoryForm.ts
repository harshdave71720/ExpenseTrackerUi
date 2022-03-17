import { ICategory,Category } from "src/entities/category";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";


export class CategoryForm
{
    form : FormGroup;
    name : FormControl;
    constructor(category : ICategory | null)
    {
        this.name = new FormControl(category?.name, [Validators.required, Validators.maxLength(50), Validators.minLength(4),AllWhiteSpaceValidator()]);
        this.form = new FormGroup(
        {
            name : this.name
        });
    }

    getCategory() : ICategory
    {
        return new Category(this.name.value);
    }
}

function AllWhiteSpaceValidator() : ValidatorFn
{
    return (control : AbstractControl) : ValidationErrors | null =>
    {
        let value = control.value as string;
        if(value == null || value.trim().length == 0)
            return {AllWhiteSpace : {value : "Should Not Be Empty"}};
        return null;
    }
}