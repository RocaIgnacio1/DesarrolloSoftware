import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  public readonly ApiUrl: string = environment.apiUrl;
  private readonly globalToken = 'mi_aplicacion_token';
  private readonly globalID = 'mi_aplicacion_id';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

    guardarToken(token: string): void {
      this.cookieService.set(this.globalToken, token);
    }
  
    obtenerToken(): string | null {
      return this.cookieService.get(this.globalToken);
    }
  
    eliminarToken(): void {
      this.cookieService.delete(this.globalToken);
    }
  
    guardarID(id: number): void {
      this.cookieService.set(this.globalID, id.toString());
    }
  
    obtenerID(): number | null {
      const idString = this.cookieService.get(this.globalID);
      return idString ? parseInt(idString, 10) : null;
    }
  
    eliminarID(): void {
      this.cookieService.delete(this.globalID);
    }

  // USUARIO
  getUsuario(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/oneusuario`, data, {
      headers: headers,
    });
  }

  updateUsuario(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.put(`${this.ApiUrl}/usuario`, data, { headers: headers });
  }
  // PRODUCTO
  getProductos(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/allarticulos`, data, {
      headers: headers,
    });
  }

  getProducto(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/onearticulo`, data, {
      headers: headers,
    });
  }

  addProducto(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/articulo`, data, {
      headers: headers,
    });
  }

  updateProducto(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.put(`${this.ApiUrl}/articulo`, data, { headers: headers });
  }

  deleteProducto(id: number): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.delete(`${this.ApiUrl}/onearticulo/${id}`, {
      headers: headers,
    });
  }

  //CATEGORIAS
  getCategorias(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/allcategorias`, data, {
      headers: headers,
    });
  }

  //CONTENIDOS
  updateContenidos(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.put(`${this.ApiUrl}/contenido`, data, {
      headers: headers,
    });
  }

  getContenido(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/onecontenido`, data, {
      headers: headers,
    });
  }

  //CARACTERISTICAS
  getCaracteristicas(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/allcaracteristicas`, data, {
      headers: headers,
    });
  }

  //LOGIN
  login(data: any): Observable<any> {
    //const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/login`, data);
  }

  //REGISTRO
  registro(data: any): Observable<any> {
    //const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/usuario`, data);
  }

  //DIRECCIONES
  getDireccion(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/alldirecciones`, data, { headers: headers });
  }

  //FOTOS
  addFoto(id: number, data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/fotos/${id}`, data, {
      headers: headers,
    });
  }

  allFotos(id: number): Observable<any> {
    const data = {};
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/allfotos/${id}`, data, {
      headers: headers,
    });
  }

  rutaFoto(ruta: string): Observable<any> {
    return this.http.get(`${this.ApiUrl}/RutasArticulos/${ruta}`);
  }

  //COMPRAS
  addCompra(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/compra`, data, { headers: headers });
  }

  tokenHeaders() {
    const token = this.obtenerToken();

    if (token !== null) {
      const headers = new HttpHeaders({
        Token: token,
      });
      return headers;
    } else {
      throw new Error('El token es nulo');
    }
  }
}
