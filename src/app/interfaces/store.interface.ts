import { Credential, Movie, Profile } from '../models';

export interface Store {
  activeProfile: Profile,
  credentials: Credential[],
  movies: Movie[],
  profiles: Profile[],
}
