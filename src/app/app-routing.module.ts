import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './auth/login/login.component';
import {HomeComponent} from "./home/home.component";
import {CreatePostComponent} from "./post/create-post/create-post.component";
import {ViewPostComponent} from "./post/view-post/view-post.component";
import {UserProfileComponent} from "./auth/user-profile/user-profile.component";
import {authGuard} from "./auth/auth.guard";
import {ParsedPostComponent} from "./shared/parsed-post/parsed-post.component";
import {AdminComponent} from "./admin/admin/admin.component";
import {UserPostComponent} from "./admin/user-post/user-post.component";
import {AdminCommentComponent} from "./admin/admin-comment/admin-comment.component";
import {UpdatePostComponent} from "./post/update-post/update-post.component";


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "sign-up", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "parsed-post", component: ParsedPostComponent},
  {path: "create-post", component: CreatePostComponent, canActivate: [authGuard]},
  {path: "update-post/:id", component: UpdatePostComponent, canActivate: [authGuard]},
  {path: "admin", component: AdminComponent},
  {path: "admin/user-post", component: UserPostComponent},
  {path: "admin/user-comment", component: AdminCommentComponent},
  {path: "view-post/:id", component: ViewPostComponent, canActivate: [authGuard]},
  {path: "view-profile/:username", component: UserProfileComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
