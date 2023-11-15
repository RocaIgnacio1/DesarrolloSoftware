import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeriaComponent } from './feria/feria.component';
import { PublicarComponent } from './publicar/publicar.component';
import { MisProductosComponent } from './misproductos/misproductos.component';
import { MiCuentaComponent } from './micuenta/micuenta.component';
import { LoginRegistroComponent } from './login-registro/login-registro.component';
import { NavegadorComponent } from './navegador/navegador.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { CargarProductoComponent } from './cargar-producto/cargar-producto.component';

const routes: Routes = [
  { path: '', component: LoginRegistroComponent },
  { path: 'feria', component: FeriaComponent},
  { path: 'publicar-producto', component: PublicarComponent },
  { path: 'misproductos', component: MisProductosComponent },
  { path: 'micuenta', component: MiCuentaComponent },
  { path: 'navegador', component: NavegadorComponent },
  { path: 'carrito', component: CarritoComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'home' , component: HomeComponent},
  { path: 'producto-detalle/:ID' , component: ProductoDetalleComponent},
  { path: 'cargar-producto' , component: CargarProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

  
