import { Movie } from './movie.model';

export class Profile {

  public amountOfWatchedMovies: number = 5;

  constructor(
    public id: string | number,
    public username: string,
    public name: string,
    public email: string,
    public picture: string,
    public movies: Movie[],
  ) {
    if (this.picture) {
      this.picture = `assets/${this.picture}`;
    }
  }

  public watchMovie(movie: Movie) {
    const movieIndex = this.movies.findIndex(m => m.id === movie.id);

    if (movieIndex >= 0) {
      const firstMovie = this.movies[movieIndex];
      this.movies.splice(movieIndex,1);
      this.movies = [firstMovie, ...this.movies];
    } else {
      this.movies = [movie, ...this.movies.splice(0, 4)];
    }

    this.amountOfWatchedMovies += 1;
  }

}
