import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-feria',
  templateUrl: './feria.component.html',
  styleUrls: ['./feria.component.css']
})
export class FeriaComponent implements OnInit {
  producto: any;
  filterSearch: FormGroup;
  private precioTotal : number=0;

  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    
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

    this.productoService.getProducto().subscribe({
      next: (producto: any) => {
        this.producto = producto;
        console.log(this.producto);
      }
    });
  }

  onSubmitFilter() {
    if (this.filterSearch.valid) {
      const filters = this.filterSearch.value;
  
      this.productoService.getProducto().subscribe({
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
  
  
  agregarCarrito(item: any){
    console.log(item);
    let icarrito: any = {
      Foto: item.Foto,
      ID: item.ID,
      Nombre: item.Nombre,
      PrecioActual:item.PrecioActual
    }
    this.precioTotal = this.precioTotal + icarrito.PrecioActual;
    localStorage.setItem("precioTotal", this.precioTotal.toString());

    if(localStorage.getItem("carrito") === null){
      let carrito: any[]=[];
      carrito.push(icarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
      let carritoStorage = localStorage.getItem("carrito") as string;
      let carrito = JSON.parse(carritoStorage);
      carrito.push(icarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    
    
  }
}
