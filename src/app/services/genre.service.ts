import { BehaviorSubject, Observable } from 'rxjs';
import { get as idbGet, set as idbSet } from 'idb-keyval';
import { Injectable } from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { Movie } from '../models';
import { Genre } from '../enums';

@Injectable()
export class GenreService {

  readonly key = 'genreMetrics';

  private _genreMetricsBehaviorSubject: BehaviorSubject<Map<string, number>> = new BehaviorSubject(undefined);

  constructor() {
    idbGet(this.key).then((metrics: Map<string, number>) => {
      this._genreMetricsBehaviorSubject.next(metrics ? metrics: new Map());
    });
  }

  public generateMetricFromMovies(movies: Movie[]): void {
    this._genreMetricsBehaviorSubject.asObservable().pipe(
        filter(metrics => !!metrics),
        take(1)
      ).subscribe(genreMetrics => {
        movies.forEach(m => {
          m.genres.forEach(genre => {
            const amountOfViews = genreMetrics.get(genre);
            genreMetrics.set(genre, amountOfViews ? amountOfViews + 1 : 1);
          });
        });

        this._genreMetricsBehaviorSubject.next(genreMetrics);
        idbSet(this.key, genreMetrics);
      });
  }

  getGenreMetricsObservable(): Observable<Map<string, number>> {
    return this._genreMetricsBehaviorSubject.asObservable().pipe(filter(metrics => !!metrics));
  }

  increaseGenreMetric(genre: Genre) {
    this._genreMetricsBehaviorSubject.asObservable().pipe(
      filter(metrics => !!metrics),
      take(1)
    ).subscribe(genreMetrics => {
      const amountOfViews = genreMetrics.get(genre);
      genreMetrics.set(genre, amountOfViews ? amountOfViews + 1 : 1);
      this._genreMetricsBehaviorSubject.next(genreMetrics);
      idbSet(this.key, genreMetrics);
    });
  }

}
