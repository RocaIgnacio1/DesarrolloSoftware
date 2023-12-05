import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public ApiUrl = 'http://localhost:3005' ;
  private globalToken: string = "";
  private globalID : number = 0;

  constructor(private http: HttpClient) { }

  guardarToken(token: string): void {
    this.globalToken = token;
  }

  obtenerToken(): string {
    return this.globalToken;
  }

  guardarID(token: string): void {
    this.globalToken = token;
  }

  obtenerID(): string {
    return this.globalToken;
  }
  // PRODUCTO
  getProductos(data: any): Observable<any>{
    data["token"] = this.globalToken;
    return this.http.post(`${this.ApiUrl}/allarticulos`, data);
  }

  getProducto(data: any): Observable<any>{
    console.log(data)
    data["token"] = this.globalToken;
    return this.http.post(`${this.ApiUrl}/onearticulo`, data);
  }

  addProducto(data: any): Observable<any>{
    console.log(data)
    data["token"] = this.globalToken;
    return this.http.post(`${this.ApiUrl}/articulo`, data);
  }

  //CATEGORIAS
  getCategorias(data: any): Observable<any>{
    data["token"] = this.globalToken;
    return this.http.post(`${this.ApiUrl}/allcategorias`, data);
  }

  //CONTENIDOS 
  updateContenidos(data: any): Observable<any>{
    data["token"] = this.globalToken;
    return this.http.put(`${this.ApiUrl}/contenido`, data);
  }

  //CATACTERISTICAS
  getCaracteristicas(data: any): Observable<any>{
    data["token"] = this.globalToken;
    return this.http.post(`${this.ApiUrl}/allcaracteristicas`, data);
  }

  //LOGIN
  login(data: any): Observable<any>{
    data["token"] = this.globalToken;
    return this.http.post(`${this.ApiUrl}/login`, data);
  }

  //FOTOS
  addFoto(id : number, data: any): Observable<any>{
    data["token"] = this.globalToken;
    return this.http.post(`${this.ApiUrl}/fotos/${id}`, data);
  }

  allFotos(id : number): Observable<any>{
    const data = {
      token : this.globalToken
    };
    return this.http.get(`${this.ApiUrl}/allfotos/${id}`);
  }

  rutaFoto(ruta : string): Observable<any>{
    const data = {
      token : this.globalToken
    };
    return this.http.get(`${this.ApiUrl}/RutasArticulos/${ruta}`);
  }

  //COMPRAS
  addCompra(data : any): Observable<any>{
    data["token"] = this.globalToken;
    return this.http.post(`${this.ApiUrl}/compra`, data);
  }

}
