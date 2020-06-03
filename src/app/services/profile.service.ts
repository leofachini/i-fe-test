import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { get as idbGet, set as idbSet } from 'idb-keyval';
import { filter, map, take } from 'rxjs/operators';
import { find } from 'lodash-es';

import { GenreService } from './genre.service';
import { Movie, Profile } from '../models';
import { MovieService } from './movie.service';

@Injectable()
export class ProfileService {

  private _activeProfileBehaviorSubject: BehaviorSubject<Profile> = new BehaviorSubject(undefined);
  private _profilesBehaviorSubject: BehaviorSubject<Profile[]> = new BehaviorSubject(undefined);

  constructor(
    private _movieService: MovieService,
    private _genreService: GenreService,
  ) {
    idbGet('profiles').then((profiles: Profile[]) => {
      if (profiles) {
        this._profilesBehaviorSubject.next(profiles.map(this._profileFactory));
      } else {
        this._createProfiles();
      }
    });
    idbGet('activeProfile').then(this.setActiveProfile.bind(this));
  }

  private _createProfiles(): void {
    const profiles =  [
      new Profile(1, 'bob', 'Bob', 'bb@bob.us', 'bob-dylan-profile.jpg', this._movieService.getRandomMovies(5)),
      new Profile(2, 'kate', 'Kate', 'kt@kate.la', 'kate-moss-profile.jpeg', this._movieService.getRandomMovies(5)),
      new Profile(3, 'quentin', 'Quentin', 'qt@pulp.fc', 'tarantino-profile.jpg', this._movieService.getRandomMovies(5)),
    ];
    idbSet('profiles', profiles);

    const movies: Movie[] = profiles.reduce((acc, profile) => {
      return acc.concat(profile.movies);
    }, []);

    this._genreService.generateMetricFromMovies(movies);
    this._profilesBehaviorSubject.next(profiles.map(this._profileFactory));
  }

  findProfile(username): Observable<Profile> {
    return this.getProfilesObservable().pipe(
        filter(p => !!p),
        take(1),
        map(profiles => find(profiles, { username }))
      );
  }

  getProfilesObservable(): Observable<Profile[]> {
    return this._profilesBehaviorSubject.asObservable();
  }

  getProfiles(): Profile[] {
    return this._profilesBehaviorSubject.getValue();
  }

  getActiveProfile(): Profile {
    return this._profileFactory(this._activeProfileBehaviorSubject.getValue());
  }

  getActiveProfileObservable(): Observable<Profile> {
    return this._activeProfileBehaviorSubject.asObservable();
  }

  setActiveProfile(profile: Profile): void {
    this._activeProfileBehaviorSubject.next(profile);
    idbSet('activeProfile', profile);
    if (profile) {
      profile = this._profileFactory(profile);
      const profiles = this.getProfiles();
      const profileIndex = profiles.findIndex(p => p.id === profile.id);
      profiles[profileIndex] = profile;
      this._profilesBehaviorSubject.next(profiles);
      idbSet('profiles', profiles);
    }
  }

  private _profileFactory(profile: Profile) {
    return new Profile(
      profile.id,
      profile.username,
      profile.name,
      profile.email,
      profile.picture,
      profile.movies,
      profile.amountOfWatchedMovies
    );
  }

}
