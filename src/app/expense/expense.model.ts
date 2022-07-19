export interface IExpense{
    id : number;
    date : Date;
    amount : number;
    description? : string | null;
    categoryName? : string | null;
}
