import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import orderBy from 'lodash-es/orderBy';
import * as faker from 'faker';

import { MovieService, ProfileService } from 'src/app/services';
import { Movie, Profile } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, OnDestroy {

  movies: Movie[] = [];
  profiles: Profile[] = [];
  profileSubscription: Subscription;
  topMoviesWatchedInBrazil: Movie[] = [];

  constructor(
    private _movieService: MovieService,
    private _profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this._movieService.getMovies().pipe(take(1)).subscribe(movies => {
      this.movies = movies;
    });

    let randomWatchedMovies = this._movieService.getRandomMovies(5)
      .map((movie, index) => {
        movie.views = faker.random.number({min: 10000, max: 1000000});
        return movie
      });

    this.topMoviesWatchedInBrazil = orderBy(randomWatchedMovies, ['views'], ['desc']);
    this._subscribeToProfilesChanges();
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  private _subscribeToProfilesChanges (): void {
    this.profileSubscription = this._profileService.getProfilesObservable().subscribe(profiles => {
      console.log(profiles);
      this.profiles = orderBy((profiles || []), ['amountOfWatchedMovies'], ['desc']);
    });
  }

  watchMovie(movie: Movie): void {
    const activeProfile = this._profileService.getActiveProfile();
    activeProfile.watchMovie(movie);
    this._profileService.setActiveProfile(activeProfile);
  }

}
