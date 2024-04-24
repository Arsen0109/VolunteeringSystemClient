import { Component, OnInit } from '@angular/core';
import { LoginRequestPayload } from './loginRequest';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  loginRequestPayload!: LoginRequestPayload;

  constructor(private authService: AuthService) { 
    this.loginRequestPayload = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get("username")?.value;
    this.loginRequestPayload.password = this.loginForm.get("password")?.value;
    this.authService.login(this.loginRequestPayload).subscribe(() => console.log("Logged in successfully"))
  }
}
