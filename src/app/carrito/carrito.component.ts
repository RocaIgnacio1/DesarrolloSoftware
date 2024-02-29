import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';

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
  
  constructor(private productoService: ProductoService){}

  ngOnInit(): void {
    // Obtengo el JSON de la cookie
    let carritoCookie = document.cookie.replace(/(?:(?:^|.*;\s*)carrito\s*=\s*([^;]*).*$)|^.*$/, "$1");

    if (carritoCookie) {
        // Si la cookie "carrito" existe, no necesitas JSON.parse ya que los datos están en formato JSON
        this.listaItemsCarrito = JSON.parse(carritoCookie);

        // Calcula el precio total
        this.precioTotal = 0;
        for (let item of this.listaItemsCarrito) {
            this.precioTotal += item.PrecioActual;
        }
    }
  }
    /*let carritoStorage = localStorage.getItem("carrito") as string;
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
  }*/

  vaciarCarrito() {
    //localStorage.clear();
    document.cookie = "carrito=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    this.listaItemsCarrito = [];
    this.precioTotal = 0;
  }

  sacarDelCarrito(item: any) {
    if (item) {
      const index = this.listaItemsCarrito?.indexOf(item);

      if (index !== -1) {
        this.listaItemsCarrito?.splice(index, 1);

        this.precioTotal -= item.PrecioActual;
        document.cookie = "carrito=" + JSON.stringify(this.listaItemsCarrito) + "; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/";
      }
    }
  }

  comprar() {
    
    this.listaItemsCarrito.forEach((prod: any) => {
      var jsoncomprar = {
        IDArticulo : prod.ID,
        Cantidad : prod.Cantidad,
        IDUsuario : this.productoService.obtenerID(),
        IDDireccion : 1014,
        MetodoPago : 'EFECTIVO'
      } 
      this.productoService.addCompra(jsoncomprar).subscribe((data: any) => {
      });
      });
  }
}
