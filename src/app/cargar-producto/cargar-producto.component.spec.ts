import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarProductoComponent } from './cargar-producto.component';

describe('CargarProductoComponent', () => {
  let component: CargarProductoComponent;
  let fixture: ComponentFixture<CargarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarProductoComponent]
    });
    fixture = TestBed.createComponent(CargarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
