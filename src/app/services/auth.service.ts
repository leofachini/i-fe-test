import { Injectable } from '@angular/core';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import find from 'lodash-es/find';

import { Credential, Profile } from '../models';
import { CredentialService } from './credential.service';
import { ProfileService } from './profile.service';

@Injectable()
export class AuthService {

  private _firsTimeFlag: boolean = true;
  private _isLoggedInBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private _credentialService: CredentialService,
    private _profileService: ProfileService,
  ) { }

  login(credential: Credential): Observable<Profile> {
    if (this.isLoggedIn()) {
      return throwError(new Error('You are already logged in!'));
    }

    const isAllowed = !!find(this._credentialService.getCredentials(), { username: credential.username, password: credential.password });

    if (isAllowed) {
      const profile: Profile = this._profileService.findProfile(credential.username);
      this._profileService.setActiveProfile(profile);
      return of(this._profileService.getActiveProfile());
    }
    return throwError(new Error('Invalid credentials!'));
  }

  isLoggedIn(): boolean {
    return this._isLoggedInBehaviorSubject.getValue();
  }

  isLoggedInObservable(): Observable<boolean> {
    return this._profileService.getActiveProfileObservable()
      .pipe(
        filter(profile => this._firsTimeFlag ? !!profile : true),
        map(profile => {
          this._firsTimeFlag = false;
          return !!profile;
        })
      );
  }
}
