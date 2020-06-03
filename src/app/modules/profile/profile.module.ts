import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LogoutDialogComponent } from './components/logout-dialog.component';
import { ProfilePage } from './profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LogoutDialogComponent,
    ProfilePage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ProfilePage,
    }]),
    SharedModule,
  ],
  entryComponents: [LogoutDialogComponent],
})
export class ProfileModule {}
