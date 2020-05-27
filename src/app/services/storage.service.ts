import { Injectable } from '@angular/core';
import { get, set } from 'idb-keyval';
import { cloneDeep, isObject } from 'lodash-es';

import { Store } from '../interfaces';
import { Credential, Profile } from '../models';
import { CredentialService } from './credential.service';
import { ProfileService } from './profile.service';

@Injectable()
export class StorageService {

  private _store: Store;

  constructor(
    private _credentialService: CredentialService,
    private _profileService: ProfileService,
  ) {
    get('store').then((store: Store) => {
      if (!isObject(store)) {
        this._initStoreObject();
      } else {
        this._store = store;
        this._dispatchStoreValuesToServices();
      }
    });
  }

  private _initStoreObject() {
    this._store = {
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

    set('store', this._store).then(() => {
      this._dispatchStoreValuesToServices();
    });
  }

  private _dispatchStoreValuesToServices() {
    this._profileService.setProfiles(this._store.profiles);
    this._credentialService.setCredentials(this._store.credentials);
  }

  getStore(): Store {
    return cloneDeep(this._store);
  }

}
