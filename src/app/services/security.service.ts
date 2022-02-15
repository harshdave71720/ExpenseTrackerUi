import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "src/entities/user";

@Injectable()
export class SecurityService {
  user : User;

  login() : Observable<User>
  {
    if(this.user != null)
      return of(this.user);

    this.user = new User();
    this.user.email = "harshdave71720@gmail.com";
    this.user.firstname = "Harsh";
    this.user.lastname = "Dave";
    this.user.isAuthenticated = true;
    return of(this.user);
  }

  logout() {
    this.user = null;
  }

  register(user : User) {
    this.user = user;
  }
}
