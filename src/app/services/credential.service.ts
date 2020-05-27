import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { get } from 'idb-keyval';

import { Credential } from '../models';
import { Store } from '../interfaces';

@Injectable()
export class CredentialService {

  private _profilesBehaviorSubject: BehaviorSubject<Credential[]> = new BehaviorSubject([]);

  constructor() {
    get('store').then((store: Store) => {
      this.setCredentials(store.credentials);
    });
  }

  getProfilesObservable(): Observable<Credential[]> {
    return this._profilesBehaviorSubject.asObservable();
  }

  getCredentials(): Credential[] {
    return this._profilesBehaviorSubject.getValue();
  }

  setCredentials(credentials: Credential[]): void {
    this._profilesBehaviorSubject.next(credentials);
  }

}
