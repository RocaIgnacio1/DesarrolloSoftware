import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {

  jsonDireccion: any;
  StockActualizado: any;
  listaItemsCarrito: any[] = [];
  direccion: any = {};
  precioTotal: number = 0;
  item: any;

  constructor(private productoService: ProductoService) {
    this.jsonDireccion = {
      ID: this.productoService.obtenerID()
    };

    this.productoService.getDireccion(this.jsonDireccion).subscribe((data: any) => {
      this.direccion = data[0];
    });
  }

  ngOnInit(): void {
    // Obtengo el JSON de la cookie
    let carritoCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)carrito\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

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

  vaciarCarrito() {
    document.cookie = 'carrito=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    this.listaItemsCarrito = [];
    this.precioTotal = 0;
  }

  sacarDelCarrito(item: any) {
    if (item) {
      const index = this.listaItemsCarrito?.indexOf(item);

      if (index !== -1) {
        this.listaItemsCarrito?.splice(index, 1);

        this.precioTotal -= item.PrecioActual;
        document.cookie =
          'carrito=' +
          JSON.stringify(this.listaItemsCarrito) +
          '; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/';
      }
    }
  }

  comprar() {
    this.listaItemsCarrito.forEach((prod: any) => {
   
      var jsoncomprar = {
        IDArticulo: prod.ID,
        Cantidad: prod.Cantidad,
        IDUsuario: this.productoService.obtenerID(),
        IDDireccion: 1000,
        MetodoPago: 'EFECTIVO',
      };

      this.productoService.addCompra(jsoncomprar).subscribe((data: any) => {});
    });
    document.cookie = 'carrito=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    this.listaItemsCarrito = [];
    this.precioTotal = 0;

    alert("Compra hecha con exito")
  }
}
