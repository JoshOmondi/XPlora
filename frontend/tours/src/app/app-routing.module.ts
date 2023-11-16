import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UserLoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutComponent } from './about/about.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
