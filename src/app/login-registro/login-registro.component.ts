import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent {

  formularioRegistro: FormGroup;
  formularioInicioSesion: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.formularioInicioSesion = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitRegistro() {
    if (this.formularioRegistro.valid) {
      // Lógica para enviar los datos del formulario de registro.
      console.log(this.formularioRegistro.value);
    }
  }

  onSubmitInicioSesion() {
    if (this.formularioInicioSesion.valid) {
      // Lógica para enviar los datos del formulario de inicio de sesión.
      console.log(this.formularioInicioSesion.value);
    }
  }

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (container !== null) {
      signUpButton?.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton?.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }
  }
}
