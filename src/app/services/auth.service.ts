import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import find from 'lodash-es/find';

import { Credential, Profile } from '../models';
import { CredentialService } from './credential.service';
import { ProfileService } from './profile.service';

@Injectable()
export class AuthService {

  private _isAuthenticated = false;

  constructor(
    private _credentialService: CredentialService,
    private _profileService: ProfileService,
  ) { }

  login(credential: Credential): Observable<Profile> {
    if (this._isAuthenticated) {
      return throwError(new Error('You are already logged in!'));
    }

    const isAllowed = !!find(this._credentialService.getCredentials(), { username: credential.username, password: credential.password });

    if (isAllowed) {
      this._isAuthenticated = true;
      return of(this._profileService.findProfile(credential.username));
    }
    return throwError(new Error('Invalid credentials!'));
  }

  isLoggedIn(): boolean {
    return !!this._isAuthenticated;
  }

}
