import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css'],
})
export class ModificarProductoComponent {
  id: any;
  descripcion1: any;
  descripcion2: any;
  descripcion3: any;
  producto: any = {};
  contenido: any = {};
  categorias: any[] = [];
  caracteristicas: any[] = [];
  idcaracteristicas: { ID: number; Descripcion: string }[] = [];
  label1Text: string = '';
  label2Text: string = '';
  label3Text: string = '';
  selectedCategory: { ID: number; Nombre: string } = { ID: 0, Nombre: '' };
  selectedCharacteristic: string = '';
  filtredCharacteristics: any[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = {
      ID: this.route.snapshot.params['ID'],
    };

    this.label1Text = '';
    this.label2Text = '';
    this.label3Text = ' ';

  }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    try {
      const productoData: any = await this.productoService
        .getProducto(this.id)
        .toPromise();
      this.producto = productoData;

      const jsoncontenido = {
        IDArticulo: this.producto.ID,
      };

      const contenidoData: any = await this.productoService
        .getContenido(jsoncontenido)
        .toPromise();
      this.contenido = contenidoData;

      this.descripcion1 = this.contenido[0].Descripcion;
      this.descripcion2 = this.contenido[1].Descripcion;
      this.descripcion3 = this.contenido[2].Descripcion;

      const categoriasData: any = await this.productoService
        .getCategorias({})
        .toPromise();
      this.categorias = categoriasData;

      this.selectedCategory.Nombre = this.categorias.find(
        (categoria) =>
          categoria.ID.toString() === this.producto.IDCategoria.toString()
      ).Descripcion;

      this.onCategoryChange();
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  onCategoryChange() {
    //this.categorias = this.categorias.filter(item => item.Descripcion !== this.selectedCategory.Nombre);
    this.selectedCategory.ID = this.categorias.find(
      (categoria) => categoria.Descripcion === this.selectedCategory.Nombre
    )?.ID;
    this.filtredCharacteristics = this.caracteristicas.filter(
      (caracteristica) =>
        caracteristica.IDCategoria === this.selectedCategory.ID
    );
    const jsonhelp = {
      IDCategoria: this.selectedCategory.ID,
    };

    this.productoService.getCaracteristicas(jsonhelp).subscribe((data: any) => {
      this.idcaracteristicas = data;
    });
    switch (this.selectedCategory.ID) {
      case 1000: // Cerámica
        this.label1Text = 'Tipo de arcilla';
        this.label2Text = 'Técnica de modelado';
        this.label3Text = 'Tipo de esmalte';
        break;
      case 1001: // Tejidos
        this.label1Text = 'Tipo de fibra';
        this.label2Text = 'Técnica de tejido';
        this.label3Text = 'Patrón o diseño';
        break;
      case 1002: // Joyería
        this.label1Text = 'Material';
        this.label2Text = 'Técnica de elaboración';
        this.label3Text = 'Tipo de cierre';
        break;
      case 1003: // Cestería
        this.label1Text = 'Material';
        this.label2Text = 'Técnica de tejido';
        this.label3Text = 'Tamaño del cesto';
        break;
      case 1004: // Tallado en madera
        this.label1Text = 'Tipo de madera';
        this.label2Text = 'Herramientas utilizadas';
        this.label3Text = 'Acabado';
        break;
    }
    
  }

  guardarCambios() {
    const datosModificados = {
      Nombre: this.producto.Nombre,
      PrecioActual: this.producto.PrecioActual,
      Cantidad: this.producto.Cantidad,
      Descripcion: this.producto.Descripcion,
      PrecioEnvio: 100,
      IDCategoria: this.selectedCategory.ID,
      ID: this.producto.ID,
      IDUsuario: this.producto.IDUsuario,
    };

    this.productoService.updateProducto(datosModificados).subscribe({});

    const jsoncontenido1 = {
      Descripcion: this.descripcion1,
      IDArticulo: this.producto.ID,
      IDCaracteristica: this.contenido[0].IDCaracteristica,
      ID: this.contenido[0].ID,
    };

    this.productoService
      .updateContenidos(jsoncontenido1)
      .subscribe((data1: string) => {
        var jsoncontenido2 = {
          Descripcion: this.descripcion2,
          IDArticulo: this.producto.ID,
          IDCaracteristica: this.contenido[1].IDCaracteristica,
          ID: this.contenido[1].ID,
        };

        this.productoService
          .updateContenidos(jsoncontenido2)
          .subscribe((data2: string) => {
            var jsoncontenido3 = {
              Descripcion: this.descripcion3,
              IDArticulo: this.producto.ID,
              IDCaracteristica: this.contenido[2].IDCaracteristica,
              ID: this.contenido[2].ID,
            };

            this.productoService
              .updateContenidos(jsoncontenido3)
              .subscribe((data3: string) => {});
          });
      });
      this.reloadCurrentRouteWithDelay()
     
  }

  async reloadCurrentRouteWithDelay() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    await this.router.navigate(['/misproductos']);
  }
}
