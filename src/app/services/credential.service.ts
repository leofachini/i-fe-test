import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Credential } from '../models';

@Injectable()
export class CredentialService {

  private _defaultCredentials = [
    new Credential('bob', 'dylan'),
    new Credential('kate', 'moss'),
  ];
  private _profilesBehaviorSubject: BehaviorSubject<Credential[]> = new BehaviorSubject(this._defaultCredentials);

  constructor() {}

  getProfilesObservable(): Observable<Credential[]> {
    return this._profilesBehaviorSubject.asObservable();
  }

  getCredentials(): Credential[] {
    return this._profilesBehaviorSubject.getValue();
  }

  setCredentials(credentials: Credential[] = this._defaultCredentials): void {
    this._profilesBehaviorSubject.next(credentials);
  }

}
