import { Injectable } from '@angular/core';
import find from 'lodash-es/find';

import { Profile } from '../models';

@Injectable()
export class ProfileService {

  static readonly profiles = [
    new Profile('bob', 'Bob', 'bb@bob.us', 'bob-profile-photo.jpg', []),
    new Profile('kate', 'Kate', 'kt@kate.la', 'kate-profile-photo.jpg', []),
  ];

  public static findProfile(username): Profile {
    return find(ProfileService.profiles, { username });
  }

}
