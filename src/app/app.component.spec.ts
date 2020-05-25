import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      de = fixture.debugElement;
      comp = de.componentInstance;
      el = de.nativeElement;
    });
  }));

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

});
