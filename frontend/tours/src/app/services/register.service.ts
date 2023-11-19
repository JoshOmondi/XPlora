// register.service.ts
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
    // Make the HTTP POST request
    return this.http.post(this.apiUrl, user);
  }

  saveUserDataLocally(user: Register): void {
    // Save user data to localStorage
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getUserDataLocally(): Register | null {
    // Retrieve user data from localStorage
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }

  clearUserDataLocally(): void {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
  }
}
