import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError, BehaviorSubject, filter, take} from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginResponsePayload } from "./auth/login/loginResponse";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
      return next.handle(req);
    }
    const jwtToken = this.authService.getAuthToken();

    return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse
        && error.status === 401) {
        return this.handleAuthErrors(req, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponsePayload) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject
            .next(refreshTokenResponse.authToken);
          return next.handle(this.addToken(req,
            refreshTokenResponse.authToken));
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addToken(req,
            this.authService.getAuthToken()))
        })
      );
    }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + jwtToken)
    });
  }

}
