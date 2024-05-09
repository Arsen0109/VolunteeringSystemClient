import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {AuthService} from "../auth/shared/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn?: boolean
  username?: string
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  goToUserProfile(){}

  logout(){}
}
