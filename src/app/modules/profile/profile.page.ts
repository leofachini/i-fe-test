import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService, ProfileService } from 'src/app/services';
import { LogoutDialogComponent } from './components/logout-dialog.component';
import { Profile } from 'src/app/models';
import { Router } from '@angular/router';
import { Breadcrumb } from 'src/app/interfaces/breadcrumb.interface';

@Component({
  selector: 'mf-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  breadcrumbs: Breadcrumb[] = [
    {
      label: 'Home',
      path: '',
    },
    {
      label: 'Profile',
      path: 'profile',
    },
  ];
  profileObs: Observable<Profile>;

  constructor(
    private _authService: AuthService,
    private _dialogService: MatDialog,
    private _profileService: ProfileService,
    private _router: Router) { }

  ngOnInit(): void {
    this.profileObs = this._profileService.getActiveProfileObservable();
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

}
