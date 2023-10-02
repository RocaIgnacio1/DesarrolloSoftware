import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent {

  public formLogin!: FormGroup;
  public formRegister!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
        validators: this.passwordMatchValidator, // Agrega la validación personalizada
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
  
  
  private createFormLogin():FormGroup{
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  public submitFormLogin(){
    if(this.formLogin.invalid){
      Object.values(this.formLogin.controls).forEach(control=>{
        control.markAllAsTouched();
      })
      return;
    }
    
  }

  public submitFormRegister(){
    if(this.formRegister.invalid){
      Object.values(this.formRegister.controls).forEach(control=>{
        control.markAllAsTouched();
      })
      return;
    }
  }

  public get flogin():any{
    return this.formLogin.controls;
  }

  public get fregister():any{
    return this.formRegister.controls;
  }

  ngOnInit(): void {

    this.formLogin = this.createFormLogin();
    this.formRegister = this.createFormRegister();

    // Logica para el panel movible //
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
    // ---------------------------- //
  }
}
