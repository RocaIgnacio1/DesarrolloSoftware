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

  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder
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
    // Obtén productos aquí
    this.productoService.getProducto().subscribe({
      next: (producto: any) => {
        this.producto = producto;
        console.log(this.producto);
      }
    });
  }

  onSubmitFilter() {
    if (this.filterSearch.valid) {
      // Lógica para enviar los datos del filtro de búsqueda
      console.log(this.filterSearch.value);
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
