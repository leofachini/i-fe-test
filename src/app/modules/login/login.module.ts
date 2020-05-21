import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from './components/login-form.component';
import { LoginPage } from './login.page';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: LoginPage,
    }])
  ],
})
export class LoginModule {}
