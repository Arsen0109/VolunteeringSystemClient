import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SignupRequestPayload } from '../../DTO/signupRequest';
import { AuthService } from '../shared/auth.service';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm!: FormGroup;
  signupRequestPayload!: SignupRequestPayload;
  userAlreadyExists = false

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signupRequestPayload = {
      email: '',
      username: '',
      password: ''
    }
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get("email")?.value;
    this.signupRequestPayload.username = this.signupForm.get("username")?.value;
    this.signupRequestPayload.password = this.signupForm.get("password")?.value;

    this.authService.signup(this.signupRequestPayload).subscribe(data => {

        this.router.navigate(['login'], {queryParams: {registered: 'true'}})

    }, (error) => {
      if (error.status == 406){
        this.userAlreadyExists = true
      }
      this.toastr.error("Registration failed!")
    })
  }
}
