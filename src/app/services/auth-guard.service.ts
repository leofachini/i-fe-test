import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this._authService.isLoggedInObservable().pipe(
        map(isLoggedIn => {
          if (!isLoggedIn) {
            this._router.navigate(['login']);
            return false;
          }
          return true;
        }),
        take(1)
      );
  }
}
