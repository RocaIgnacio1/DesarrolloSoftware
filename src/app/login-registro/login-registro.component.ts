import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent {

  public formLogin!: FormGroup;
  public formRegister!: FormGroup;

  constructor(private productoService: ProductoService, private formBuilder: FormBuilder) {
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

  loginOnclick(): void {
    console.log("Entre");
    const jsondata = {
      Username : '',
      Password : ''
    }
    this.productoService.login(jsondata).subscribe((data: any) => {
      
    });
  }
  ngOnInit(): void {

    this.formLogin = this.createFormLogin();
    this.formRegister = this.createFormRegister();
    
    // Logica para el panel movible. Pantalla chica //
    
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const containerSignIn = document.querySelector('.form-container.sign-in-container') as HTMLElement;
    const containerSignUp = document.querySelector('.form-container.sign-up-container') as HTMLElement;

    if (containerSignIn !== null && containerSignUp !== null && signInButton !== null && signUpButton !== null) {
        signUpButton?.addEventListener('click', () => {
            console.log('hola');
            containerSignIn.style.display = "none";
            signUpButton.style.display = "none";
            containerSignUp.style.display = "block";
            signInButton.style.display = "block";
            console.log("Hola mundo");
        });
        

        signInButton?.addEventListener('click', () => {
            containerSignUp.style.display = "none";
            signInButton.style.display = "none";
            containerSignIn.style.display = "block";
            signUpButton.style.display = "block";
        });
    }
  

  }
}
