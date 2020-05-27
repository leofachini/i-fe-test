import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  AuthGuardService,
  AuthService,
  CredentialService,
  ProfileService,
  StorageService,
} from './services';

const SERVICES = [
  AuthGuardService,
  AuthService,
  CredentialService,
  ProfileService,
  StorageService,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [...SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
