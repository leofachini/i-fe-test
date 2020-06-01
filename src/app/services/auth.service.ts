import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, map, mergeMap } from 'rxjs/operators';
import find from 'lodash-es/find';

import { Credential, Profile } from '../models';
import { CredentialService } from './credential.service';
import { ProfileService } from './profile.service';

@Injectable()
export class AuthService {

  private _isLoggedInBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private _credentialService: CredentialService,
    private _profileService: ProfileService,
  ) { }

  login(credential: Credential): Observable<Profile | Observable<never>> {
    return this.isLoggedInObservable()
      .pipe(
        take(1),
        mergeMap(isLoggedIn => {
          if (isLoggedIn) {
            throw Error('You are already logged in!');
          }

          const isAllowed = !!find(this._credentialService.getCredentials(), { username: credential.username, password: credential.password });

          if (isAllowed) {
            return this._profileService.findProfile(credential.username);
          }
          throw new Error('Invalid credentials!');
        }),
        map(profile => {
          this._profileService.setActiveProfile(profile);
          return this._profileService.getActiveProfile();
        })
      );
  }

  isLoggedIn(): boolean {
    return this._isLoggedInBehaviorSubject.getValue();
  }

  isLoggedInObservable(): Observable<boolean> {
    return this._profileService.getActiveProfileObservable()
      .pipe(
        map(profile => {
          this._isLoggedInBehaviorSubject.next(!!profile);
          return !!profile;
        })
      );
  }

  logout(): void {
    this._profileService.setActiveProfile(undefined);
  }
}
