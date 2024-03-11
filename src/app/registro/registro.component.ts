import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  // Creacion del formulario de tipo FormGroup
  public formRegister!: FormGroup;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  // Inicializamos el formulario en la variable formRegister
  ngOnInit(): void {
    this.formRegister = this.createFormRegister();
  }

  // Definimos la estructura que tomara el formulario
  private createFormRegister(): FormGroup {
    return this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        nombreUsuario: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.passwordMatchValidator, this.passwordFormValidator],
      }
    );
  }

  // Funcion para validar que las contraseñas coincidan
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  // Funcion para validar que la contraseña cumpla con los requisitos. Se valida aca y en el server
  passwordFormValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');

    if (!passwordControl) {
      return false;
    }

    const password = passwordControl.value;
    console.log(password);
    const regexMayuscula = /[A-Z]/;
    const regexNumero = /[0-9]/;
    const regexCaracterEspecial = /[!@#$%^&*()\-_=+[\]{}|;:'",.<>/?\\]/;

    if (password.length < 8) {
      return false;
    }

    if (!regexMayuscula.test(password)) {
      return false;
    }

    if (!regexNumero.test(password)) {
      return false;
    }

    if (!regexCaracterEspecial.test(password)) {
      return false;
    }

    return true;
  }

  // Funcion para enviar el formulario al servicio y validarlo
  public submitFormRegister() {
    if (this.formRegister.invalid) {
      Object.values(this.formRegister.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }

    const jsondata = {
      Nombre: this.formRegister.get('nombre')?.value,
      Apellido: this.formRegister.get('apellido')?.value,
      Mail: this.formRegister.get('email')?.value,
      Username: this.formRegister.get('nombreUsuario')?.value,
      Password: this.formRegister.get('password')?.value,
      TipoUsuario: 'USER',
    };

    this.productoService.registro(jsondata).subscribe(
      (data: any) => {

        const jsonlogin = {
          Username: this.formRegister.get('nombreUsuario')?.value,
          Password: this.formRegister.get('password')?.value
        };
        console.log(jsonlogin)
        this.productoService.login(jsonlogin).subscribe(
          (data: any) => {
            this.productoService.guardarID(data.ID);
            this.productoService.guardarToken(data.token);
            this.router.navigate(['/feria']);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  public get fregister(): any {
    return this.formRegister.controls;
  }

  // Funcion para cambiar de registro -> login
  cambiarVista() {
    this.router.navigate(['/login']);
  }
}
