import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  loginUser(userDetails: any) {
    this.userSubject.next(userDetails);
  }

  logoutUser() {
    this.userSubject.next(null);
  }
}
