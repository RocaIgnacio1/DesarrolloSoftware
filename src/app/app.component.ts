import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'probando';
  mostrarHeader: boolean = true;
  mostrarFooter: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.verificarMostrarComponentes();
      }
    });
  }

  private verificarMostrarComponentes() {
    // Obtén la información de la ruta activa
    const data = this.activatedRoute.snapshot.firstChild?.data;

    // Actualiza la visibilidad del header y el footer
    this.mostrarHeader = data ? data['mostrarHeader'] !== undefined ? data['mostrarHeader'] : true : true;
    this.mostrarFooter = data ? data['mostrarFooter'] !== undefined ? data['mostrarFooter'] : true : true;
  }
}
