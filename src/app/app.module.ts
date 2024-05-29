import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LocalStorageDirective} from "ngx-localstorage";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {TokenInterceptor} from "./token-interceptor";
import { HomeComponent } from './home/home.component';
import { PostComponent } from './shared/post/post.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DatePipe} from "@angular/common";
import { CreatePostComponent } from './post/create-post/create-post.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import {EditorModule, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";
import { ViewPostComponent } from './post/view-post/view-post.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import {ProgressBarModule} from "angular-progress-bar";
import { ParsedPostComponent } from './shared/parsed-post/parsed-post.component';
import { CopyToClipboardComponent } from './copy-to-clipboard/copy-to-clipboard.component';
import { AdminComponent } from './admin/admin/admin.component';
import { UserPostComponent } from './admin/user-post/user-post.component';
import { AdminCommentComponent } from './admin/admin-comment/admin-comment.component';
import {AdminParsedPostComponent} from "./admin/admin-parsed-post/admin-parsed-post.component";
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    CreatePostComponent,
    SidebarComponent,
    ViewPostComponent,
    UserProfileComponent,
    ParsedPostComponent,
    CopyToClipboardComponent,
    AdminParsedPostComponent,
    AdminCommentComponent,
    AdminComponent,
    UserPostComponent,
    AdminCommentComponent,
    AdminSidebarComponent,

  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LocalStorageDirective,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
