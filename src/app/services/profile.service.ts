import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cloneDeep, find, set } from 'lodash-es';
import { get as idbGet, set as idbSet } from 'idb-keyval';

import { Profile } from '../models';
import { Store } from '../interfaces';

@Injectable()
export class ProfileService {

  private _activeProfileBehaviorSubject: BehaviorSubject<Profile> = new BehaviorSubject(undefined);
  private _profilesBehaviorSubject: BehaviorSubject<Profile[]> = new BehaviorSubject([]);

  constructor() {
    idbGet('store').then((store: Store) => {
      this.setActiveProfile(store.activeProfile);
      this.setProfiles(store.profiles);
    });
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

  setProfiles(profiles: Profile[]): void {
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
    idbGet('store').then((store: Store) => {
      set(store, 'activeProfile', profile);
      idbSet('store', store);
    });
  }

}
