import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { LoginPage } from './login.page';
import { LoginFormComponent } from './components/login-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { By } from '@angular/platform-browser';

describe('LoginPage', () => {
  let comp: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
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
        LoginPage,
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginPage);
      de = fixture.debugElement;
      comp = de.componentInstance;
      el = de.nativeElement;
    });
  }));

  it('should create the Login page component', () => {
    expect(comp).toBeTruthy();
  });

  it('should have the \'Enter in MyFlix\' test in page header', () => {
    fixture.detectChanges();

    const text = 'Enter in MyFlix';
    const h1 = de.query(By.css('#loginPage > h1')).nativeElement;
    expect(h1.textContent).toEqual(text);
  });

  it('should render the LoginForm component', () => {
    fixture.detectChanges();

    const loginForm = de.query(By.css('login-form'));
    expect(loginForm).toBeTruthy();
  });

});
