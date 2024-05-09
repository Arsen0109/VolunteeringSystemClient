import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {AuthService} from "../auth/shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn?: boolean
  username?: string
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  goToUserProfile(){
    this.router.navigateByUrl(`/view-profile/${this.username}`)
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    })
  }
}
