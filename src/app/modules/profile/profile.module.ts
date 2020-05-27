import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
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
})
export class ProfileModule {}
