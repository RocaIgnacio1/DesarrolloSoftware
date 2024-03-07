import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargar-producto',
  templateUrl: './cargar-producto.component.html',
  styleUrls: ['./cargar-producto.component.css'],
})
export class CargarProductoComponent implements OnInit {
  idContenidos: any[] = [];
  idcaracteristicas: { ID: number; Descripcion: string }[] = [];
  idProducto: number = 0;
  producto: any = {};
  selectedFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  categorias: any[] = [];
  caracteristicas: any[] = [];
  selectedCategory: { ID: number; Nombre: string } = { ID: 0, Nombre: '' };
  selectedCharacteristic: string = '';
  filtredCharacteristics: any[] = [];
  profileForm: FormGroup;
  label1Text: string = '';
  label2Text: string = '';
  label3Text: string = '';
  imagenBinaria: string | ArrayBuffer | null = null;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      productName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      productCategory: new FormControl('', [Validators.required]),
      productCharacteristic1: new FormControl(''),
      productCharacteristic2: new FormControl(''),
      productCharacteristic3: new FormControl(''),
      foto: [''],
      productPrice: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      productStock: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      productDescription: new FormControl('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
      productPhoto: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.productoService.getCategorias({}).subscribe((data: any) => {
      this.categorias = data;
    });
    /*
    this.http.get<any[]>('assets/caracteristicas.json').subscribe(data => {
      this.caracteristicas = data;
    });*/

    this.label1Text = '';
    this.label2Text = '';
    this.label3Text = ' ';
  }

  onCategoryChange() {
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
      case 1000: //Alfarería
        this.label1Text = 'Medidas';
        this.label2Text = 'Color';
        this.label3Text = 'Técnica';
        break;
      case 1001: //Tejido a mano
        this.label1Text = 'Medidas';
        this.label2Text = 'Material';
        this.label3Text = 'Diseño';
        break;
      case 1002: //Joyería
        this.label1Text = 'Material';
        this.label2Text = 'Diseño';
        this.label3Text = 'Técnica';
        break;
      case 1003: //Instrumentos y juguetes
        this.label1Text = 'Material';
        this.label2Text = 'Diseño';
        this.label3Text = 'Edad recomendada';
        break;
      case 1004: //Talabartería
        this.label1Text = 'Medidas';
        this.label2Text = 'Detalles';
        this.label3Text = 'Diseño';
        break;
    }
  }

  guardarProducto() {
    const jsonarticulo = {
      Nombre: this.profileForm.value.productName,
      PrecioActual: this.profileForm.value.productPrice,
      Cantidad: this.profileForm.value.productStock,
      Descripcion: this.profileForm.value.productDescription,
      IDCategoria: this.selectedCategory.ID,
      IDUsuario: this.productoService.obtenerID(),
    };

    this.productoService.addProducto(jsonarticulo).subscribe((data: any) => {
      this.idProducto = data.IDArticulo;
      this.idContenidos = data.IDContenidos;
      var jsoncontenido1 = {
        Descripcion: this.profileForm.value.productCharacteristic1,
        IDArticulo: this.idProducto,
        IDCaracteristica: this.idcaracteristicas[0].ID,
        ID: this.idContenidos[0].ID,
      };
      this.productoService
        .updateContenidos(jsoncontenido1)
        .subscribe((data1: string) => {
          var jsoncontenido2 = {
            Descripcion: this.profileForm.value.productCharacteristic2,
            IDArticulo: this.idProducto,
            IDCaracteristica: this.idcaracteristicas[1].ID,
            ID: this.idContenidos[1].ID,
          };
          this.productoService
            .updateContenidos(jsoncontenido2)
            .subscribe((data2: string) => {
              var jsoncontenido3 = {
                Descripcion: this.profileForm.value.productCharacteristic3,
                IDArticulo: this.idProducto,
                IDCaracteristica: this.idcaracteristicas[2].ID,
                ID: this.idContenidos[2].ID,
              };
              this.productoService
                .updateContenidos(jsoncontenido3)
                .subscribe((data3: string) => {
                  const formData: FormData = new FormData();
                  formData.append(
                    'archivos',
                    this.selectedFile as File,
                    this.profileForm.value.productPhoto
                  );
                  this.productoService
                    .addFoto(this.idProducto, formData)
                    .subscribe((data3: string) => {
                      window.location.reload();
                    });
                });
            });
        });
    });
    this.router.navigate(['/misproductos']);
  }

  isButtonDisabled() {
    return this.profileForm.invalid;
  }

  onFileSelected(event: any) {
    const file: File | null = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage();
    } else {
      this.selectedFile = null;
      this.imageSrc = null;
    }

    const archivo: File = event.target.files[0];

    if (archivo) {
      // Lee el contenido binario del archivo
      const lector = new FileReader();
      lector.onload = () => {
        this.imagenBinaria = lector.result;
        this.profileForm.patchValue({
          foto: this.imagenBinaria, // Actualiza el campo 'foto' en el formulario
        });
      };
      lector.readAsDataURL(archivo);
    }
  }

  previewImage() {
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile as File);
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
  }
}
