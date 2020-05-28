import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cloneDeep, find } from 'lodash-es';
import { get as idbGet, set as idbSet } from 'idb-keyval';

import { Profile } from '../models';

@Injectable()
export class ProfileService {

  private _activeProfileBehaviorSubject: BehaviorSubject<Profile> = new BehaviorSubject(undefined);
  private _defaultProfiles = [
    new Profile('bob', 'Bob', 'bb@bob.us', 'bob-dylan-profile.jpg', []),
    new Profile('kate', 'Kate', 'kt@kate.la', 'kate-moss-profile.jpeg', []),
  ];
  private _profilesBehaviorSubject: BehaviorSubject<Profile[]> = new BehaviorSubject(this._defaultProfiles);

  constructor() {
    idbGet('activeProfile').then(this.setActiveProfile.bind(this));
  }

  findProfile(username): Profile {
    return find(this.getProfiles(), { username });
  }

  getProfilesObservable(): Observable<Profile[]> {
    return this._profilesBehaviorSubject.asObservable();
  }

  getProfiles(): Profile[] {
    return this._profilesBehaviorSubject.getValue();
  }

  setProfiles(profiles: Profile[] = this._defaultProfiles): void {
    this._profilesBehaviorSubject.next(profiles);
  }

  getActiveProfile(): Profile {
    return cloneDeep(this._activeProfileBehaviorSubject.getValue());
  }

  getActiveProfileObservable(): Observable<Profile> {
    return this._activeProfileBehaviorSubject.asObservable();
  }

  setActiveProfile(profile: Profile): void {
    this._activeProfileBehaviorSubject.next(profile);
    idbSet('activeProfile', profile);
  }

}
