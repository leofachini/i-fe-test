import { CommonModule } from '@angular/common';
import {
  MatButton,
  MatButtonModule,
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
  MatDialogClose,
  MatDialogModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSnackBarModule,
} from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const COMPONENTS = [
  MatButton,
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
  MatDialogClose,
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
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  exports: [
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ...COMPONENTS,
  ],
})
export class SharedModule {}
