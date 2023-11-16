import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient 
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegistrationSuccess() {
    const userData = this.registrationForm.value;

    // Send a POST request to your backend API
    this.http.post('http://localhost:3500/api/register', userData).subscribe(
      (response: any) => {
        console.log(response);
        console.log('User registered successfully.');

        // Navigate to the login page after successful registration
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
