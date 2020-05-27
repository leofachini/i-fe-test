import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Credential } from '../models';

@Injectable()
export class CredentialService {

  private _profilesBehaviorSubject: BehaviorSubject<Credential[]> = new BehaviorSubject([]);

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
