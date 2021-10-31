export interface IExpense{
    id : number;
    date : Date;
    amount : number;
    description? : string | null;
    categoryName? : string | null;
}

export class Expense implements IExpense{
    id : number = 0;
    date : Date = new Date(Date.now());
    amount : number = 0;
    description: string | null = null;
    categoryName: string | null = null;

    constructor() {
        this.date = new Date(Date.now());
    }
}