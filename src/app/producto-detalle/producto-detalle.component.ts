import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})


export class ProductoDetalleComponent {
  ID: number;
  producto: any[] = [];
  precioProducto: number = 0;
  cantidad: number = 1;
  total: number = 0;
  private precioTotal : number=0;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.cargarDatos();
    this.ID = this.route.snapshot.params['ID'] - 1;
  }
  
  cargarDatos(){
    this.http.get('assets/data/productos.json').subscribe((data: any) => {
      this.producto = data;
      this.precioProducto = this.producto[this.ID].PrecioActual;
      this.actualizarTotal();
    });
  }

  irFeria(){
    this.router.navigate(['/feria']);
  }
  
  actualizarTotal() {
    this.total = this.precioProducto * this.cantidad;
  }
  
  actualizarCantidad(event: any) {
    // Asegúrate de que la cantidad sea un número válido y mayor o igual a 1
    const newCantidad = parseInt(event.target.value, 10);
    if (!isNaN(newCantidad) && newCantidad >= 1) {
      this.cantidad = newCantidad;
      this.actualizarTotal();
    } else {
      // Puedes mostrar un mensaje de error si la cantidad no es válida
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
    this.router.navigate(['/carrito']);
    
  }

}
