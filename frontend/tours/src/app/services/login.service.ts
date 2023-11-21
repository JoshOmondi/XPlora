import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3500/user';

  constructor(private http: HttpClient) {}
  login(user: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }
}
