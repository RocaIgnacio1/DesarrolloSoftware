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
  public formLogin!: FormGroup;
  

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  cambiarVista() {
    this.router.navigate(['/registro']);
  }

  private createFormLogin(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public submitFormLogin() {
    if (this.formLogin.invalid) {
      Object.values(this.formLogin.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }
  }

  public get flogin(): any {
    return this.formLogin.controls;
  }

  loginOnclick(): void {
    const jsondata = {
      Username: this.formLogin.get('email')?.value,
      Password: this.formLogin.get('password')?.value,
    };
    this.productoService.login(jsondata).subscribe((data: any) => {
      this.productoService.guardarID(data.ID);
      this.productoService.guardarToken(data.token);
      this.router.navigate(['/feria']);
    });
  }
  ngOnInit(): void {
    this.formLogin = this.createFormLogin();
  }
}


