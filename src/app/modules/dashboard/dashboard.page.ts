import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { orderBy } from 'lodash-es';
import * as faker from 'faker';

import { MovieService, ProfileService, GenreService } from 'src/app/services';
import { Movie, Profile } from 'src/app/models';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, OnDestroy {

  private _profileSubscription: Subscription;

  genreMetrics: Observable<Array<{key, value}>>;
  movies: Observable<Movie[]>;
  profiles: Profile[] = [];
  topMoviesWatchedInBrazil: Movie[] = [];

  constructor(
    private _genreService: GenreService,
    private _movieService: MovieService,
    private _profileService: ProfileService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.movies = this._movieService.getMovies();

    let randomWatchedMovies = this._movieService.getRandomMovies(5)
      .map(movie => {
        movie.views = faker.random.number({min: 10000, max: 1000000});
        return movie
      });

    this.topMoviesWatchedInBrazil = orderBy(randomWatchedMovies, ['views'], ['desc']);
    this._subscribeToProfilesChanges();
    this._setGenreMetricsObservable();
  }

  ngOnDestroy(): void {
    if (this._profileSubscription) {
      this._profileSubscription.unsubscribe();
    }
  }

  private _setGenreMetricsObservable(): void {
    this.genreMetrics = this._genreService.getGenreMetricsObservable()
      .pipe(map(metrics => {
        let metricArray: Array<{key, value}> = Array.from(metrics.entries()).map((entries: Array<any>) => {
          const [key, value] = entries;
          return {key, value};
        })
        return orderBy(metricArray, ['value'], ['desc']);
      }));
  }

  private _subscribeToProfilesChanges (): void {
    this._profileSubscription = this._profileService.getProfilesObservable()
      .subscribe(profiles => {
        this.profiles = orderBy((profiles || []), ['amountOfWatchedMovies'], ['desc']);
      });
  }

  watchMovie(movie: Movie): void {
    const activeProfile = this._profileService.getActiveProfile();
    activeProfile.watchMovie(movie);
    this._profileService.setActiveProfile(activeProfile);
    movie.genres.forEach(this._genreService.increaseGenreMetric.bind(this._genreService));
    this._snackBar.open('Playing your movie in instants!', 'Ok', {
      duration: 5000,
    });
  }

}
