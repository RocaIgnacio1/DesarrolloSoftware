import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.css'],
})
export class MiCuentaComponent {
  id: any;
  usuario: any = {};

  passwordActual: string = '';
  passwordNueva: string = '';
  passwordRepetir: string = '';

  passwordNoCoinciden: boolean = false;
  passwordActualIncorrecta: boolean = false;
  passwordNuevaNoValida: boolean = false;
  exito: boolean = false;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = {
      ID: 1018,
    };
    this.cargarDatos();
  }

  cargarDatos() {
    this.productoService.getUsuario(this.id).subscribe((usuarioData) => {
      this.usuario = usuarioData;
    });
  }

  guardarCambiosPublicos() {
    const datosModificados = {
      ID: this.usuario.ID,
      Nombre: this.usuario.Nombre,
      Apellido: this.usuario.Apellido,
      Mail: this.usuario.Mail,
      Username: this.usuario.Username,
      Password: this.usuario.Password,
      TipoUsuario: 'USER',
    };

    this.productoService.updateUsuario(datosModificados).subscribe({});
  }

  guardarCambiosPrivados() {
    this.passwordNoCoinciden = false;
    this.passwordNuevaNoValida = false;
    this.passwordActualIncorrecta = false;
    this.exito = false;

    // validacion por si la nueva contraseña y su repeticion no coinciden
    if (this.passwordNueva !== this.passwordRepetir) {
      this.passwordNoCoinciden = true;
      return;
    }

    const datosActuales = {
      Username: this.usuario.Username,
      Password: this.passwordActual,
    };
    this.productoService.login(datosActuales).subscribe(
      (data: any) => {
        const datosModificados = {
          ID: this.usuario.ID,
          Nombre: this.usuario.Nombre,
          Apellido: this.usuario.Apellido,
          Mail: this.usuario.Mail,
          Username: this.usuario.Username,
          Password: this.passwordNueva,
          TipoUsuario: 'USER',
        };

        this.productoService.updateUsuario(datosModificados).subscribe(
          (respuesta: any) => {},
          (error: any) => {
            if (error.status === 200) {
              // Si el error es 200, consideramos que la contraseña se actualizó correctamente
              console.log('Contraseña actualizada correctamente');
              this.exito = true;
              setTimeout(() => {
                // Recargar la página
                window.location.reload();
              }, 1500);
            } else {
              // Si el error no es 200, mostramos un mensaje de error
              console.error(
                'Error en la actualización de la contraseña:',
                error
              );
              this.passwordNuevaNoValida = true;
            }
          }
        );
      },
      (error: any) => {
        // mostrar contraseña actual incorrecta
        this.passwordActualIncorrecta = true;
      }
    );
  }
}
