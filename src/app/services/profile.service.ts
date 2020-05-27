import { Injectable } from '@angular/core';
import find from 'lodash-es/find';

import { Profile } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProfileService {

  private _profilesBehaviorSubject: BehaviorSubject<Profile[]> = new BehaviorSubject([]);

  findProfile(username): Profile {
    return find(this.getProfiles(), { username });
  }

  getProfilesObservable(): Observable<Profile[]> {
    return this._profilesBehaviorSubject.asObservable();
  }

  getProfiles(): Profile[] {
    return this._profilesBehaviorSubject.getValue();
  }

  setProfiles(profiles: Profile[]): void {
    this._profilesBehaviorSubject.next(profiles);
  }

}
