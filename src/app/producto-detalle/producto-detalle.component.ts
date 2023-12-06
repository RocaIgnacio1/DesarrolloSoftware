import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})


export class ProductoDetalleComponent {
  id: any;
  producto: any = {};
  precioProducto: number = 0;
  cantidad: number = 1;
  total: number = 0;
  private precioTotal : number=0;

  constructor(private productoService: ProductoService, private router: Router, private route: ActivatedRoute) {
    this.id = {
      ID : this.route.snapshot.params['ID']
    }
    this.cargarDatos();
  }
  
  cargarDatos(){
    this.productoService.getProducto(this.id).subscribe((data: any) => {
      this.producto = data;
      this.precioProducto = this.producto.PrecioActual;
      this.productoService.allFotos(this.producto.ID).subscribe((data: any) => {
        this.producto.Foto = this.productoService.ApiUrl + '/' + data;
      });
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
      Cantidad: this.cantidad,
      PrecioActual: this.total //item.PrecioActual
    }
    //this.precioTotal = this.precioTotal + icarrito.PrecioActual;
    //localStorage.setItem("precioTotal", this.precioTotal.toString());

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
