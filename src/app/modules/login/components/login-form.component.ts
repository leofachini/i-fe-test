import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import { Credential } from '../../../models/credential.model';

@Component({
  selector: 'mf-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output()
  login = new EventEmitter<Credential>();

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTimes = faTimes;
  hidePassword = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      const credential = new Credential(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
      this.login.emit(credential);
    }
  }

}
