import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FeriaComponent } from './feria/feria.component';
import { MiCuentaComponent } from './micuenta/micuenta.component';
import { MisProductosComponent } from './misproductos/misproductos.component';
import { NavegadorComponent } from './navegador/navegador.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { CargarProductoComponent } from './cargar-producto/cargar-producto.component';
import { ModificarProductoComponent } from './modificar-producto/modificar-producto.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    FeriaComponent,
    MiCuentaComponent,
    MisProductosComponent,
    NavegadorComponent,
    CarritoComponent,
    FooterComponent,
    HomeComponent,
    ProductoDetalleComponent,
    CargarProductoComponent,
    ModificarProductoComponent,
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
