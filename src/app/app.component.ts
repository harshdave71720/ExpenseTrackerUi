import { Component, OnInit } from '@angular/core';

import { ApplicationUser } from 'src/app/models/application-user.model';
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
    this.securityService.user$.subscribe(u => this.user = u);
  }

  logout() : void {
    this.securityService.logout();
    this.user = undefined;
  }
}
