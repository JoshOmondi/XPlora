import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loggingForm: FormGroup | undefined;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loggingForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLoginSuccess(): void {
    console.log('Login successful!');

     this.router.navigate(['/user-dashboard']);
  }
}
