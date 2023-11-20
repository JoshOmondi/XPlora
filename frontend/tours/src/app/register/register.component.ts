// your.component.ts
import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Register } from '../interface/register';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user!: Register
  
 registerForm!: FormGroup

  constructor(
    private registerService: RegisterService,
    private router: Router,private fb:FormBuilder
  ) {

    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone_no: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    let registeredUser=this.registerForm.value
    this.registerService.registerUser(registeredUser).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        
        this.registerService.saveUserDataLocally(this.user);
        this.router.navigate(['/login']);

      },
      (error: any) => {
        console.error('Registration failed:', error);
      }
    );
  }
}


