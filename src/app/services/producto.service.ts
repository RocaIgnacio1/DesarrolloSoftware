import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  public ApiUrl = 'http://localhost:3005';
  private readonly globalToken = 'mi_aplicacion_token';
  private readonly globalID = 'mi_aplicacion_id';

  constructor(private http: HttpClient) {}

  guardarToken(token: string): void {
    localStorage.setItem(this.globalToken, token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.globalToken);
  }

  eliminarToken(): void {
    localStorage.removeItem(this.globalToken);
  }

  guardarID(id: number): void {
    localStorage.setItem(this.globalID, id.toString());
  }

  obtenerID(): number | null {
    const idString = localStorage.getItem(this.globalID.toString());
    return idString ? parseInt(idString, 10) : null;
  }

  eliminarID(): void {
    localStorage.removeItem(this.globalID.toString());
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

  deleteProducto(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.put(`${this.ApiUrl}/onearticulo`, data, {
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
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/login`, data, { headers: headers });
  }

  //REGISTRO
  registro(data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/usuario`, data, { headers: headers });
  }

  //FOTOS
  addFoto(id: number, data: any): Observable<any> {
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/fotos/${id}`, data, {
      headers: headers,
    });
  }

  allFotos(id: number): Observable<any> {
    const data = {
      Token: this.obtenerToken(),
    };
    const headers = this.tokenHeaders();
    return this.http.post(`${this.ApiUrl}/allfotos/${id}`, data, {
      headers: headers,
    });
  }

  rutaFoto(ruta: string): Observable<any> {
    const data = {
      Token: this.obtenerToken(),
    };
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
