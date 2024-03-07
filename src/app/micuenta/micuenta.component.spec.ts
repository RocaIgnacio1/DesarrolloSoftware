import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuentaComponent } from './micuenta.component';

describe('MiCuentaComponent', () => {
  let component: MiCuentaComponent;
  let fixture: ComponentFixture<MiCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiCuentaComponent],
    });
    fixture = TestBed.createComponent(MiCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
