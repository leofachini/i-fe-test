import { Credential, Movie, Profile } from '../models';

export interface Store {
  credentials: Credential[],
  profiles: Profile[],
  movies: Movie[],
}
