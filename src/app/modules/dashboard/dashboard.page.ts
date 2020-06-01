import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import orderBy from 'lodash-es/orderBy';
import * as faker from 'faker';

import { MovieService } from 'src/app/services';
import { Movie } from 'src/app/models';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  movies: Movie[] = [];
  topMoviesWatchedInBrazil: Movie[] = [];

  constructor(
    private _movieService: MovieService,
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
  }

}
