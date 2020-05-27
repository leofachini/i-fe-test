import { CommonModule } from '@angular/common';
import {
  MatButton,
  MatButtonModule,
  MatFormField,
  MatFormFieldModule,
  MatError,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSnackBarModule,
} from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const COMPONENTS = [
  MatButton,
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  exports: [
    FontAwesomeModule,
    ReactiveFormsModule,
    ...COMPONENTS,
  ],
})
export class SharedModule {}
