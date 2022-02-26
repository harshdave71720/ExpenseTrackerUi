export class ApplicationUser {
  email : string;
  firstname : string;
  lastname? : string;
  isAuthenticated : boolean;
  bearerToken? : string = "";
}
