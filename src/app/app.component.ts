import { Component } from '@angular/core';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExpenseTrackerUi';

  constructor(public securityService : SecurityService) {}

  logout() : void {
    this.securityService.logout();
  }
}
