import { Injectable } from '@angular/core';
// import { constructor } from 'jasmine';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userData: any = {}; 
  http: any;

  getUserData(): Observable<any> {
    
    return of(this.userData);
  }

  updateUserData(updatedData: any): Observable<any> {
    
    return this.http.put('your-update-profile-endpoint', updatedData);
  }


  constructor() { }
}
