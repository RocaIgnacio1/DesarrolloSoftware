import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feria',
  templateUrl: './feria.component.html',
  styleUrls: ['./feria.component.css']
})
export class FeriaComponent implements OnInit {
  producto: any;
  filterSearch: FormGroup;

  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private router: Router
    
  ) {
      // Inicializa el formulario dentro del constructor
    this.filterSearch = this.formBuilder.group({
      nombre: '',
      categoria: '',
      precioMin: null,
      precioMax: null
    });
  }

  ngOnInit(): void {
    this.productoService.getProductos({}).subscribe({
      next: (product: any) => {
        this.producto = product;
        this.producto.forEach((prod: any) => {
          this.productoService.allFotos(prod.ID).subscribe((data: any) => {
            prod.Foto = this.productoService.ApiUrl + '/' + data;
          });
      });
    }
  });
  }


  onSubmitFilter() {
    if (this.filterSearch.valid) {
      const filters = this.filterSearch.value;
  
      this.productoService.getProductos({}).subscribe({
        next: (productos: any) => {
          // Filtra la lista de productos según los criterios del formulario
          this.producto = productos.filter((productoItem: any) => {
            return (
              (!filters.nombre || productoItem.Nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
              (!filters.categoria || productoItem.Categoria.toLowerCase().includes(filters.categoria.toLowerCase())) &&
              (!filters.precioMin || productoItem.PrecioActual >= filters.precioMin) &&
              (!filters.precioMax || productoItem.PrecioActual <= filters.precioMax)
            );
          });
        }
      });
    }
  }

  verProducto(id: number){
    this.router.navigate(['/producto-detalle', id]);
  }
}
