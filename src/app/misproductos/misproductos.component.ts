import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.component.html',
  styleUrls: ['./misproductos.component.css'],
})
export class MisProductosComponent {
  user: any;
  producto: any;
  filterSearch: FormGroup;

  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // Inicializa el formulario dentro del constructor
    this.filterSearch = this.formBuilder.group({
      nombre: '',
      categoria: '',
      precioMin: null,
      precioMax: null,
    });

    this.user = {
      IDUsuario: this.productoService.obtenerID(),
    };
  }

  ngOnInit(): void {
    this.productoService.getProductos(this.user).subscribe({
      next: (producto: any) => {
        this.producto = producto;
        this.producto.forEach((prod: any) => {
          this.productoService.allFotos(prod.ID).subscribe((data: any) => {
            prod.Foto = this.productoService.ApiUrl + '/' + data;
          });
        });
      },
    });
  }

  onSubmitFilter() {
    if (this.filterSearch.valid) {
      const filters = this.filterSearch.value;

      this.producto = this.producto.filter((productoItem: any) => {
        return (
          (!filters.nombre ||
            productoItem.Nombre.toLowerCase().includes(
              filters.nombre.toLowerCase()
            )) &&
          (!filters.categoria ||
            productoItem.Categoria.toLowerCase().includes(
              filters.categoria.toLowerCase()
            )) &&
          (!filters.precioMin ||
            productoItem.PrecioActual >= filters.precioMin) &&
          (!filters.precioMax || productoItem.PrecioActual <= filters.precioMax)
        );
      });
    }
  }

  modificarProducto(id: number) {
    this.router.navigate(['/modificar-producto', id]);
  }

  eliminarProducto(id: number) {
    if (
      window.confirm('¿Estás seguro de que quieres eliminar este producto?')
    ) {
      const jsonid = {
        ID: id,
      };
      this.productoService.deleteProducto(jsonid).subscribe({});
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }
}
