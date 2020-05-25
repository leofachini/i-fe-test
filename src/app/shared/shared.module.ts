import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatFormField,
  MatLabel,
  MatButton,
} from '@angular/material';

const COMPONENTS = [
  MatButton,
  MatFormField,
  MatLabel,
  MatInputModule,
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class SharedModule {}
