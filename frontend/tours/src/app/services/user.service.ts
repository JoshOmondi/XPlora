import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  updateUserData(updatedData: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  // createUser(userData: any) {
  //   throw new Error('Method not implemented.');
  // }
  private apiUrl = 'http://localhost:3500/user';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUserData`);
  }
  createUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }
}
