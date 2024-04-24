import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  {path: "sign-up", component: SignupComponent},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
