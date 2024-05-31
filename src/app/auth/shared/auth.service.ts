import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { SignupRequestPayload } from '../../DTO/signupRequest';
import {Observable, map, tap} from 'rxjs';
import { LoginRequestPayload } from '../../DTO/loginRequest';
import { LoginResponsePayload } from '../../DTO/loginResponse';
import {LocalStorageService} from "ngx-localstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }
  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any>{
    return this.httpClient.post("http://localhost:8080/api/auth/signup", signupRequestPayload, {responseType: "text"})
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean>{
    return this.httpClient.post<LoginResponsePayload>("http://localhost:8080/api/auth/login", loginRequestPayload)
    .pipe(map(data => {
      this.localStorageService.set("authenticationToken", data.authToken);
      this.localStorageService.set("username", data.username);
      this.localStorageService.set("refreshToken", data.refreshToken);
      this.localStorageService.set("expiresAt", data.expiresAt)
      this.localStorageService.set("isAdmin", data.admin)

      this.loggedIn.emit(true)
      this.username.emit(data.username)
      return true
    }))
  }

  refreshToken() {

    return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorageService.set('authenticationToken', response.authToken);
        this.localStorageService.set('expiresAt', response.expiresAt);
      }));
  }
  getAuthToken(): string {
    return <string>this.localStorageService.get('authenticationToken');
  }

  logout() {
    this.httpClient.post<string>('http://localhost:8080/api/auth/logout', this.refreshTokenPayload).subscribe(
      data => {
        console.log(data)
      }
    )
    this.localStorageService.clear();
  }
  getUserName(): string {
    return <string>this.localStorageService.get('username');
  }

  getRefreshToken() {
    return this.localStorageService.get('refreshToken');
  }
  getAdmin(): string {
    return <string>this.localStorageService.get('isAdmin');
  }
  getExpirationTime() {
    return this.localStorageService.get('expiresAt');
  }
  isLoggedIn(): boolean {
    return this.getAuthToken() != null;
  }
}

