import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatFormField,
  MatLabel,
  MatButton,
} from '@angular/material';
import { NgModule } from '@angular/core';

const COMPONENTS = [
  MatButton,
  MatFormField,
  MatInputModule,
  MatLabel,
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class SharedModule {}
