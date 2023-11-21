import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../interface/login';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loggingForm: FormGroup | undefined;
  // formBuilder: any;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggingForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLoginSuccess(): void {
    if (this.loggingForm) {
      const user: Login = this.loggingForm.value;

      this.loginService.login(user).subscribe(
        (response: any) => {
          console.log('Login successful!:', response);

          localStorage.setItem('authToken', response.token);

          this.router.navigate(['/user-dashboard']);
        },
        (error: any) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}