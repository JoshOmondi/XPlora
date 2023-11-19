// your.component.ts
import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Register } from '../interface/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: Register = {
    userName: '',
    email: '',
    phoneNo: '',
    password: '',
  };
  router: any;

  constructor(private registerService: RegisterService) {}

  onSubmit() {
    this.registerService.registerUser(this.user).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);

        this.registerService.saveUserDataLocally(this.user);
      },
      (error: any) => {
        console.error('Registration failed:', error);
      }
    );
  }
}


