import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services';
import { Credential } from '../../models/credential.model';

@Component({
  selector: 'mf-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  login(credential: Credential): void {
    const subscription = this._authService.login(credential)
      .subscribe(() => {
        this._router.navigate(['']);
      }, this.handleError.bind(this));
    subscription.unsubscribe();
  }

  handleError(error: Error): void {
    this._snackBar.open(error.message, 'Ok', {
      duration: 10000,
      panelClass: ['myflix-snack-bar', 'warning'],
    });
  }
}
