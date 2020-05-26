import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import find from 'lodash-es/find';

import { Credential, Profile } from '../models';
import { ProfileService } from './profile.service';

@Injectable()
export class AuthService {

  private isAuthenticated = false;

  login(credential: Credential): Observable<Profile> {
    if (this.isAuthenticated) {
      Observable.throw(new Error('You are already logged in!'));
    }

    const isAllowed = !!find(Credential.credentials, { username: credential.username, password: credential.password });

    if (isAllowed) {
      return of(ProfileService.findProfile(credential.username));
    }
    Observable.throw(new Error('Invalid credentials!'));
  }

}
