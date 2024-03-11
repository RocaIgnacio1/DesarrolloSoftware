import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Creacion del formulario de tipo FormGroup
  public formLogin!: FormGroup;

  public errorMessage: string = '';

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  // Inicializamos el formulario en la variable formLogin
  ngOnInit(): void {
    this.formLogin = this.createFormLogin();
  }

  // Definimos la estructura que tomara el formulario
  private createFormLogin(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  // Funcion para enviar el formulario al servicio y validarlo
  public submitFormLogin(): void {
    if (this.formLogin.invalid) {
      Object.values(this.formLogin.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }

    const jsondata = {
      Username: this.formLogin.get('email')?.value,
      Password: this.formLogin.get('password')?.value,
    };

    this.productoService.login(jsondata).subscribe(
      (data: any) => {
        this.productoService.guardarID(data.ID);
        this.productoService.guardarToken(data.token);
        this.router.navigate(['/feria']);
      },
      (error) => {
        if (error.status === 400) {
          this.errorMessage =
            'Datos incorrectos. Por favor, intentar nuevamente.';
        } else {
          this.errorMessage = 'Error del servidor.';
        }
      }
    );
  }

  // Funcion para eliminar el mensaje de "Datos incorrectos" cuando el usuario interactua de nuevo con un input
  public clearErrorMessage(): void {
    this.errorMessage = '';
  }

  // Funcion para obtener los controles del formulario
  public get flogin(): any {
    return this.formLogin.controls;
  }

  // Funcion para cambiar de login -> registro
  cambiarVista() {
    this.router.navigate(['/registro']);
  }
}
