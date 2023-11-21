import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  items: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.adminService.getItems().subscribe(
      (data: any) => {
        this.items = data;
      },
      (error: any) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  addItem(item: any) {

    this.adminService.addItem(item).subscribe(
      (response: any) => {
        console.log('Item added successfully:', response);
        this.fetchItems();
      },
      (error: any) => {
        console.error('Error adding item:', error);
      }
    );
  }

  softDeleteItem(itemId: number) {
    this.adminService.softDeleteItem(itemId).subscribe(
      (response: any) => {
        console.log('Item soft-deleted successfully:', response);
        this.fetchItems();
      },
      (error: any) => {
        console.error('Error soft-deleting item:', error);
      }
    );
  }

  updateItem(item: any) {
    this.adminService.updateItem(item).subscribe(
      (response: any) => {
        console.log('Item updated successfully:', response);
        this.fetchItems();
      },
      (error: any) => {
        console.error('Error updating item:', error);
      }
    );
  }
}
