import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cloneDeep, find } from 'lodash-es';
import { get as idbGet, set as idbSet } from 'idb-keyval';

import { MovieService } from './movie.service';
import { Profile } from '../models';

@Injectable()
export class ProfileService {

  private _activeProfileBehaviorSubject: BehaviorSubject<Profile> = new BehaviorSubject(undefined);
  private _profilesBehaviorSubject: BehaviorSubject<Profile[]>;

  constructor(
    private _movieService: MovieService,
  ) {
    idbGet('profiles').then((profiles: Profile[]) => {
      if (!profiles) {
        profiles =  [
          new Profile(1, 'bob', 'Bob', 'bb@bob.us', 'bob-dylan-profile.jpg', this._movieService.getRandomMovies(5)),
          new Profile(2, 'kate', 'Kate', 'kt@kate.la', 'kate-moss-profile.jpeg', this._movieService.getRandomMovies(5)),
          new Profile(3, 'quentin', 'Quentin', 'qt@pulp.fc', 'tarantino-profile.jpg', this._movieService.getRandomMovies(5)),
        ];
        idbSet('profiles', profiles);
      }
      this._profilesBehaviorSubject = new BehaviorSubject(profiles);
    })
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

  getActiveProfile(): Profile {
    return cloneDeep(this._activeProfileBehaviorSubject.getValue());
  }

  getActiveProfileObservable(): Observable<Profile> {
    return this._activeProfileBehaviorSubject.asObservable();
  }

  setActiveProfile(profile: Profile): void {
    this._activeProfileBehaviorSubject.next(profile);
    idbSet('activeProfile', profile);
    if (profile) {
      const profiles = this.getProfiles();
      const profileIndex = profiles.findIndex(p => p.id === profile.id);
      profiles[profileIndex] = profile;
      idbSet('profiles', profiles);
    }
  }

}
