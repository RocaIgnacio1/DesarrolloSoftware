import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  listaItemsCarrito: any[] = [];
  //public precioTotal: number=0;
  precioTotal: number=0;
  item: any;

  ngOnInit(): void {
    let carritoStorage = localStorage.getItem("carrito") as string;
    //let precioTotalStorage = localStorage.getItem('precioTotal'); 
    let precioTotalStorage = this.precioTotal;


    let carrito = JSON.parse(carritoStorage);
    this.listaItemsCarrito = carrito;
    if (precioTotalStorage !== null) {
      for(this.item of this.listaItemsCarrito){
          this.precioTotal = this.precioTotal + this.item.PrecioActual;
      }
      //this.precioTotal = parseFloat(precioTotalStorage); // Convierte el valor a número
    }
  }

  vaciarCarrito() {
    localStorage.clear();
    this.listaItemsCarrito = [];
    this.precioTotal = 0;
  }

  sacarDelCarrito(item: any) {
    if (item) {
      // Encuentra el índice del elemento en el array
      const index = this.listaItemsCarrito?.indexOf(item);

      // Verifica si el elemento se encontró en el carrito
      if (index !== -1) {
        this.listaItemsCarrito?.splice(index, 1);

        // Actualiza
        this.precioTotal -= item.PrecioActual;
        localStorage.setItem("carrito", JSON.stringify(this.listaItemsCarrito));
      }
    }
  }
}
