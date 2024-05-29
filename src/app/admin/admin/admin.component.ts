import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/shared/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  userIsAdmin!: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userIsAdmin = JSON.parse(this.authService.getAdmin());
  }
}
