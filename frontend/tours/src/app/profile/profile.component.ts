import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userProfileForm: FormGroup | undefined;
  isLoading = true; 

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (userData: any) => {
        this.initializeForm(userData);
        this.isLoading = false; 
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
        this.isLoading = false; 
      }
    );
  }

  private initializeForm(userData: any): void {
    this.userProfileForm = this.fb.group({
      username: [userData.username || '', [Validators.required]],
      email: [userData.email || '', [Validators.required, Validators.email]],
    });
  }

  onUpdateProfile() {
    if (this.userProfileForm && this.userProfileForm.valid) {
      const updatedProfileData = this.userProfileForm.value;
      console.log('Updated Profile Data:', updatedProfileData);

      this.userService.updateUserData(updatedProfileData).subscribe(
        (response: any) => {
          console.log('Profile updated successfully:', response);
        },
        (error: any) => {
          console.error('Error updating profile:', error);
        }
      );
    } else {
      console.log('Form is not valid:', this.userProfileForm?.errors);
    }
  }
}
