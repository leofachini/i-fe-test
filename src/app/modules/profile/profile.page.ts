import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService, ProfileService } from 'src/app/services';
import { LogoutDialogComponent } from './components/logout-dialog.component';
import { Profile } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {

  activeProfile: Profile;

  private _profileSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _dialogService: MatDialog,
    private _profileService: ProfileService,
    private _router: Router) { }

  ngOnInit(): void {
    this._subscribeToProfileStream();
  }

  ngOnDestroy(): void {
    if (this._profileSubscription) {
      this._profileSubscription.unsubscribe();
    }
  }

  showLogoutConfirmationDialog(): void {
    const dialogRef = this._dialogService.open(LogoutDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().pipe(take(1))
      .subscribe(shouldLogout => {
        if (shouldLogout) {
          this._authService.logout();
          this._router.navigate(['login']);
        }
      });
  }

  private _subscribeToProfileStream(): void {
    this._profileSubscription = this._profileService.getActiveProfileObservable()
      .subscribe(profile => this.activeProfile = profile);
  }

}
