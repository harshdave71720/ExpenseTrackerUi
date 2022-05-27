import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from './core/models/applicationUser';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ExpenseTrackerUi';
  user : ApplicationUser = undefined;

  constructor(public authenticationService : AuthenticationService) {}

  ngOnInit() : void {
    this.user = this.authenticationService.getLoggedInUser();
    this.authenticationService.user$.subscribe(u => this.user = u);
  }

  logout() : void {
    this.authenticationService.logout();
    this.user = undefined;
  }
}
