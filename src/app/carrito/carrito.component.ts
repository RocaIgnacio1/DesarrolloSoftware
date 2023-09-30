import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  listaItemsCarrito: any[] = [];


  ngOnInit(): void {
    let carritoStorage = localStorage.getItem("carrito") as string;
    let carrito = JSON.parse(carritoStorage);
    this.listaItemsCarrito = carrito;
  }

  vaciarCarrito() {
    localStorage.clear();
    this.listaItemsCarrito = [];
  }

  sacarDelCarrito(item: any) {
    if (item) {
      // Encuentra el índice del elemento en el array
      const index = this.listaItemsCarrito?.indexOf(item);

      // Verifica si el elemento se encontró en el carrito
      if (index !== -1) {
        // Elimina el elemento del array usando splice
        this.listaItemsCarrito?.splice(index, 1);

        // Actualiza el carrito en el almacenamiento local
        localStorage.setItem("carrito", JSON.stringify(this.listaItemsCarrito));
      }
    }
  }
}
