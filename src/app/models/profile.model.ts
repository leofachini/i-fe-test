import { Movie } from './movie.model';

export class Profile {

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

}
