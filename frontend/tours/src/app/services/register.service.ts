import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../interface/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3500/user/register';

  constructor(private http: HttpClient) {}

  registerUser(user: Register): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  saveUserDataLocally(user: Register): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getUserDataLocally(): Register | null {
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }

  clearUserDataLocally(): void {
    localStorage.removeItem('userData');
  }
}
