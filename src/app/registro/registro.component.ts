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
  public formRegister!: FormGroup;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  cambiarVista() {
    this.router.navigate(['/login']);
  }

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
        validators: this.passwordMatchValidator,
      }
    );
  }

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

  public submitFormRegister() {
    if (this.formRegister.invalid) {
      Object.values(this.formRegister.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }
  }

  public get fregister(): any {
    return this.formRegister.controls;
  }

  ngOnInit(): void {
    this.formRegister = this.createFormRegister();
  }
}
