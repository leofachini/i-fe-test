import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as faker from 'faker';

import { Genre } from '../enums';
import { Movie } from '../models';

@Injectable()
export class MovieService {

  readonly movies: Movie[];

  constructor() {
    this.movies = [
      this._getTheHatefulEightData(),
      this._getIngloriousBasterdsData(),
      this._getPulpFictionData(),
      this._getFightClubData(),
      this._getJokerData(),
      this._getSpaceForceData(),
      this._getTheLastDanceData(),
      this._getTheGodfather(),
      this._getTheGooniesData(),
      this._getTheNeverendingStoryIIIData(),
    ];
  }

  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  getRandomMovies(amount: number): Movie[] {
    const moviesMap = new Map();

    while (moviesMap.size < amount) {
      const randomIndex = faker.random.number({min: 0, max: 9});
      moviesMap.set(randomIndex, this.movies[randomIndex]);
    }

    return Array.from(moviesMap.values());
  }

  private _getTheHatefulEightData() {
    return new Movie(
      1,
      'The Hateful Eight',
      'the-hateful-eight.jpg',
      [Genre.crime, Genre.drama, Genre.mistery, Genre.western],
      2015,
      'In the dead of a Wyoming winter, a bounty hunter and his prisoner ' +
      'find shelter in a cabin currently inhabited by a collection of ' +
      'nefarious characters.'
    );
  }

  private _getIngloriousBasterdsData() {
    return new Movie(
      2,
      'Inglorious Basterds',
      'inglorious-basterds-banner.jpg',
      [Genre.adventure, Genre.drama, Genre.war],
      2009,
      'In Nazi-occupied France during World War II, a plan to assassinate ' +
      'Nazi leaders by a group of Jewish U.S. soldiers coincides with a ' +
      'theatre owner\'s vengeful plans for the same.'
    );
  }

  private _getPulpFictionData() {
    return new Movie(
      3,
      'Pulp Fiction',
      'pulp-fiction-banner.jpg',
      [Genre.crime, Genre.drama],
      1994,
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a ' +
      'pair of diner bandits intertwine in four tales of violence and ' +
      'redemption.'
    );
  }

  private _getFightClubData() {
    return new Movie(
      4,
      'Fight Club',
      'fight-club-banner.jpg',
      [Genre.drama],
      1999,
      'An insomniac office worker and a devil-may-care soapmaker form an ' +
      'underground fight club that evolves into something much, much more.'
    );
  }

  private _getJokerData() {
    return new Movie(
      5,
      'Joker',
      'joker-banner.jpg',
      [Genre.crime, Genre.drama],
      2019,
      'In Gotham City, mentally troubled comedian Arthur Fleck is ' +
      'disregarded and mistreated by society. He then embarks on a downward' +
      'spiral of revolution and bloody crime. This path brings him ' +
      'face-to-face with his alter-ego: the Joker.'
    );
  }

  private _getSpaceForceData() {
    return new Movie(
      6,
      'Space Force',
      'space-force-banner.jpg',
      [Genre.comedy],
      2020,
      'The people tasked with creating a sixth branch of the armed ' +
      'services: The Space Force.'
    );

  }

  private _getTheLastDanceData() {
    return new Movie(
      7,
      'The Last Dance',
      'the-last-dance-banner.jpg',
      [Genre.documentary],
      2020,
      'Charting the rise of the 1990\'s Chicago Bulls, led by Michael ' +
      'Jordan, one of the most notable dynasties in sports history.'
    );
  }

  private _getTheGodfather() {
    return new Movie(
      8,
      'The Godfather',
      'the-godfather-banner.jpg',
      [Genre.crime, Genre.drama],
      1972,
      'The aging patriarch of an organized crime dynasty transfers control ' +
      'of his clandestine empire to his reluctant son.'
    );
  }

  private _getTheGooniesData() {
    return new Movie(
      9,
      'The Goonies',
      'the-goonies-banner.jpg',
      [Genre.adventure, Genre.comedy],
      1985,
      'A group of young misfits called The Goonies discover an ancient map ' +
      'and set out on an adventure to find a legendary pirate\'s long-lost ' +
      'treasure.'
    );
  }

  private _getTheNeverendingStoryIIIData() {
    return new Movie(
      10,
      'The Neverending Story III',
      'the-neverending-story-3-banner.jpg',
      [Genre.adventure, Genre.comedy, Genre.fantasy],
      1994,
      'A young boy must restore order when a group of bullies steal the ' +
      'magical book that acts as a portal between Earth and the ' +
      'imaginary world of Fantasia.'
    );
  }

}
