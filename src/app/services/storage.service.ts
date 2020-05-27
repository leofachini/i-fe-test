import { Injectable } from '@angular/core';
import { get, set } from 'idb-keyval';
import { isObject } from 'lodash-es';

import { Store } from '../interfaces';
import { Credential, Profile } from '../models';

@Injectable()
export class StorageService {

  private _store: Store;

  constructor() {
    get('store').then((store: Store) => {
      if (!isObject(store)) {
        this._initStoreObject();
      }
    });
  }

  private _initStoreObject() {
    this._store = {
      activeProfile: undefined,
      credentials: [
        new Credential('bob', 'dylan'),
        new Credential('kate', 'moss'),
      ],
      profiles: [
        new Profile('bob', 'Bob', 'bb@bob.us', 'bob-profile-photo.jpg', []),
        new Profile('kate', 'Kate', 'kt@kate.la', 'kate-profile-photo.jpg', []),
      ],
      movies: [],
    };

    set('store', this._store);
  }
}
