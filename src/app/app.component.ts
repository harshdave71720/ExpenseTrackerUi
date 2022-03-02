import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/entities/applicationUser';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ExpenseTrackerUi';
  user : ApplicationUser = undefined;

  constructor(public securityService : SecurityService) {}

  ngOnInit() : void {
    this.user = this.securityService.getLoggedInUser();
  }

  logout() : void {
    this.securityService.logout();
  }
}
