export interface IResponse<T> {
  statusCode : number;
  errors : string[] | null;
  data : T | null;
}
