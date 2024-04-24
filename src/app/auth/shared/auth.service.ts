import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signupRequest';
import { Observable, map } from 'rxjs';
import { LoginRequestPayload } from '../login/loginRequest';
import { LoginResponsePayload } from '../login/loginResponse';
import {LocalStorageService} from "ngx-localstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any>{
    return this.httpClient.post("http://localhost:8080/api/auth/signup", signupRequestPayload, {responseType: 'text'})
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean>{
    return this.httpClient.post<LoginResponsePayload>("http://localhost:8080/api/auth/login", loginRequestPayload)
    .pipe(map(data => {
      this.localStorageService.set("authenticationToken", data.authToken);
      this.localStorageService.set("username", data.username);
      this.localStorageService.set("refreshToken", data.refreshToken);
      this.localStorageService.set("expiresAt", data.expiresAt)

      return true
    }))
  }
}

