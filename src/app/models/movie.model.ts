import { Genre } from '../enums/genre.enum';

export class Movie {

  constructor(
    public name: string,
    public banner: string,
    public genre: Genre,
  ) {}

}
