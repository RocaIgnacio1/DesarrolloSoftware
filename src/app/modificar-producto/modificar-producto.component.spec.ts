import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProductoComponent } from './modificar-producto.component';

describe('ModificarProductoComponent', () => {
  let component: ModificarProductoComponent;
  let fixture: ComponentFixture<ModificarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarProductoComponent]
    });
    fixture = TestBed.createComponent(ModificarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
