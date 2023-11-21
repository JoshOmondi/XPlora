import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  addItem(item: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  softDeleteItem(itemId: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  updateItem(item: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getItems(): Observable<any> {
    throw new Error('Method not implemented.');
  }

  constructor() {}
}
