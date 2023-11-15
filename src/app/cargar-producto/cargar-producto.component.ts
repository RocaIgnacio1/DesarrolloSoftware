import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cargar-producto',
  templateUrl: './cargar-producto.component.html',
  styleUrls: ['./cargar-producto.component.css']
})
export class CargarProductoComponent implements OnInit{

  producto: any = {};
  selectedFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  categorias: any[] = [];
  caracteristicas: any[] = [];
  selectedCategory: { ID: number, Nombre: string } = { ID: 0, Nombre: '' };
  selectedCharacteristic: string = '';
  filtredCharacteristics: any[] = [];
  profileForm: FormGroup;
  label1Text: string = '';
  label2Text: string = '';
  label3Text: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.profileForm = this.fb.group({
      productName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      productCategory: new FormControl('', [Validators.required]),
      productCharacteristic1: new FormControl(''),
      productCharacteristic2: new FormControl(''),
      productCharacteristic3: new FormControl(''),
      productPrice: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      productStock: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      productDescription: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      productPhoto: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

    this.http.get<any[]>('assets/categorias.json').subscribe(data => {
      this.categorias = data;
    });

    this.http.get<any[]>('assets/caracteristicas.json').subscribe(data => {
      this.caracteristicas = data;
    });

    this.label1Text = 'Seleccione categoria'
    this.label2Text = 'Seleccione categoria'
    this.label3Text = 'Seleccione categoria'

  }

  onCategoryChange() {
    this.selectedCategory.ID = this.categorias.find(categoria => categoria.Descripcion === this.selectedCategory.Nombre)?.ID;
    this.filtredCharacteristics = this.caracteristicas.filter(caracteristica => caracteristica.IDCategoria === this.selectedCategory.ID);
    switch (this.selectedCategory.Nombre) {
      case "Electrónica": //Alfarería
          this.label1Text = 'Medidas'
          this.label2Text = 'Color'
          this.label3Text = 'Técnica'
          break;
      case "Moda": //Tejido a mano
          this.label1Text = 'Medidas'
          this.label2Text = 'Material'
          this.label3Text = 'Diseño'
          break;
      case "Hogar y jardín": //Joyería
          this.label1Text = 'Material'
          this.label2Text = 'Diseño'
          this.label3Text = 'Técnica'
          break;
      case "Deportes": //Instrumentos y juguetes
          this.label1Text = 'Material'
          this.label2Text = 'Diseño'
          this.label3Text = 'Edad recomendada'
          break;
      case "Juguetes": //Talabartería
          this.label1Text = 'Medidas'
          this.label2Text = 'Detalles'
          this.label3Text = 'Diseño'
          break;
    }
  }

  guardarProducto() {
    console.log('Producto a guardar:', this.profileForm.value);
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
  }

  previewImage() {
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile as File);
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
  }
}