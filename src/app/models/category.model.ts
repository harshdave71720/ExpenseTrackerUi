export interface ICategory {
    name : string;
}

export class Category implements ICategory
{
    name : string;

    constructor(name : string)
    {
        this.name = name;
    }
}
