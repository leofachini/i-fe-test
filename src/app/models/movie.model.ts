import { Genre } from '../enums/genre.enum';

export class Movie {

  constructor(
    public id: string | number,
    public name: string,
    public banner: string,
    public genres: Genre[],
    public year: number,
    public description: string,
    public views?: string,
  ) {
    if (this.banner) {
      this.banner = `assets/movies/${this.banner}`;
    }
  }

}
