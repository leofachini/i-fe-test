import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProfileService } from "./services";
import { Profile } from './models';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {

  activeProfile: Profile;

  private _profileSubscription: Subscription;

  constructor(
    private _profileSerivce: ProfileService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._profileSubscription = this._profileSerivce.getActiveProfileObservable()
      .subscribe(profile => this.activeProfile = profile);
  }

  ngOnDestroy(): void {
    if (this._profileSubscription) {
      this._profileSubscription.unsubscribe();
    }
  }

  goToProfilePage(): void {
    this._router.navigate(['profile']);
  }

}
