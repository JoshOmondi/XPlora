import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private updateSubject = new Subject<void>();
  update$ = this.updateSubject.asObservable();

  private ticketSubject = new Subject<void>();
  ticket$ = this.ticketSubject.asObservable();

  private searchUserSubject = new Subject<string>();
  searchUser$ = this.searchUserSubject.asObservable();

  updateData() {
    this.updateSubject.next();
  }

  bookTicket() {
    this.ticketSubject.next();
  }

  searchUser(username: string) {
    this.searchUserSubject.next(username);
  }
}
