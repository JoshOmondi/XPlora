import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userProfileForm: FormGroup | undefined;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    // Assuming you have a method in your UserService to retrieve user data
    const userData = this.userService.getUserData();
    this.initializeForm(userData);
  }

  private initializeForm(userData: any): void {
    this.userProfileForm = this.fb.group({
      username: [userData.username || '', [Validators.required]],
      email: [userData.email || '', [Validators.required, Validators.email]],
      // Add more form controls for other user profile fields
    });
  }

  onUpdateProfile() {
    if (this.userProfileForm && this.userProfileForm.valid) {
      const updatedProfileData = this.userProfileForm.value;
      console.log('Updated Profile Data:', updatedProfileData);

      this.userService.updateUserData(updatedProfileData).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
}
