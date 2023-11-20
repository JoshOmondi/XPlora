// user-dashboard.component.ts
import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  userDetails: any;
  constructor(
    private dashboardService: DashboardService,
    private userService: UserService
  ) {}

  

  ngOnInit() {
    this.userService.user$.subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  update() {
    this.dashboardService.updateData();
  }

  bookTicket() {
    this.dashboardService.bookTicket();
  }

  searchUser(username: string) {
    this.dashboardService.searchUser(username);
  }
}
