import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistroComponent } from './login-registro.component';

describe('LoginRegistroComponent', () => {
  let component: LoginRegistroComponent;
  let fixture: ComponentFixture<LoginRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRegistroComponent]
    });
    fixture = TestBed.createComponent(LoginRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
