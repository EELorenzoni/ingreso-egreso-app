import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService) { }

  // tslint:disable-next-line: max-line-length  tslint:disable-next-line: variable-name
  canActivate() {
    return this.authService.isAuth();
  }
}
