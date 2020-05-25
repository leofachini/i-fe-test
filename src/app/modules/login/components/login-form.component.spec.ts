import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoginFormComponent } from './login-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LoginFormComponent', () => {
  let comp: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [
        LoginFormComponent,
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginFormComponent);
      de = fixture.debugElement;
      comp = de.componentInstance;
      el = de.nativeElement;
    });
  }));

  it('should create the LoginForm component', () => {
    expect(comp).toBeTruthy();
  });

  it('should have a form tag', () => {
    fixture.detectChanges();

    const form = de.query(By.css('form#loginForm')).nativeElement;
    expect(form).toBeTruthy();
  });

  it('should have a username input', () => {
    fixture.detectChanges();

    const labelText = 'Username';

    const usernameInput = de.query(By.css('form#loginForm mat-form-field input#username')).nativeElement;
    const usernameLabel = de.query(By.css('form#loginForm mat-form-field mat-label[for=username]')).nativeElement;

    expect(usernameInput).toBeTruthy();
    expect(usernameLabel).toBeTruthy();
    expect(usernameLabel.textContent).toEqual(labelText);
  });

  it('should have a password input', () => {
    fixture.detectChanges();

    const labelText = 'Password';

    const passwordInput = de.query(By.css('form#loginForm mat-form-field input#password')).nativeElement;
    const passwordLabel = de.query(By.css('form#loginForm mat-form-field mat-label[for=password]')).nativeElement;

    expect(passwordInput).toBeTruthy();
    expect(passwordLabel).toBeTruthy();
    expect(passwordLabel.textContent).toEqual(labelText);
  });

  it('should have a Login submit button', () => {
    fixture.detectChanges();

    const labelText = 'Login';

    const submitButton = de.query(By.css('form#loginForm button#loginButton[mat-raised-button][type=submit]')).nativeElement;

    expect(submitButton).toBeTruthy();
    expect(submitButton.textContent).toEqual(labelText);
  });

});
