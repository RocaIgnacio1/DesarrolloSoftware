import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FeriaComponent } from './feria/feria.component';
import { MiCuentaComponent } from './micuenta/micuenta.component';
import { PublicarComponent } from './publicar/publicar.component';
import { MisProductosComponent } from './misproductos/misproductos.component';
import { LoginRegistroComponent } from './login-registro/login-registro.component';
import { NavegadorComponent } from './navegador/navegador.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    FeriaComponent,
    MiCuentaComponent,
    PublicarComponent,
    MisProductosComponent,
    LoginRegistroComponent,
    NavegadorComponent,
    CarritoComponent,
    FooterComponent,
    HomeComponent
  ],
    imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
