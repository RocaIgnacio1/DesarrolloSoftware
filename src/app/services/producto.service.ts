import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public ApiUrl = 'http://localhost:3005' ;
  private readonly globalToken = 'mi_aplicacion_token';
  private readonly globalID  = 'mi_aplicacion_id';

  constructor(private http: HttpClient) { }

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
  // PRODUCTO
  getProductos(data: any): Observable<any>{
    data["Token"] = this.obtenerToken();
    return this.http.post(`${this.ApiUrl}/allarticulos`, data);
  }

  getProducto(data: any): Observable<any>{
    console.log(data)
    data["Token"] = this.obtenerToken();
    return this.http.post(`${this.ApiUrl}/onearticulo`, data);
  }

  addProducto(data: any): Observable<any>{
    console.log(data)
    data["Token"] = this.obtenerToken();
    return this.http.post(`${this.ApiUrl}/articulo`, data);
  }

  updateProducto(data: any): Observable<any>{
    console.log(data)
    data["Token"] = this.obtenerToken();
    return this.http.put(`${this.ApiUrl}/articulo`, data);
  }

  deleteProducto(data: any): Observable<any>{
    data["Token"] = this.obtenerToken();
    console.log(data)
    return this.http.put(`${this.ApiUrl}/onearticulo`, data);
  }

  //CATEGORIAS
  getCategorias(data: any): Observable<any>{
    data["Token"] = this.obtenerToken();
    return this.http.post(`${this.ApiUrl}/allcategorias`, data);
  }

  //CONTENIDOS 
  updateContenidos(data: any): Observable<any>{
    data["Token"] = this.obtenerToken();
    return this.http.put(`${this.ApiUrl}/contenido`, data);
  }

  getContenido(data: any): Observable<any>{
    data["Token"] = this.obtenerToken();
    return this.http.post(`${this.ApiUrl}/onecontenido`, data);
  }

  //CATACTERISTICAS
  getCaracteristicas(data: any): Observable<any>{
    data["Token"] = this.obtenerToken();
    return this.http.post(`${this.ApiUrl}/allcaracteristicas`, data);
  }

  //LOGIN
  login(data: any): Observable<any>{
    data["Token"] = this.obtenerToken();
    return this.http.post(`${this.ApiUrl}/login`, data);
  }

  //FOTOS
  addFoto(id : number, data: any): Observable<any>{
    data["Token"] = this.obtenerToken();
    return this.http.post(`${this.ApiUrl}/fotos/${id}`, data);
  }

  allFotos(id : number): Observable<any>{
    const data = {
      Token : this.obtenerToken()
    };
    return this.http.post(`${this.ApiUrl}/allfotos/${id}`, data);
  }

  rutaFoto(ruta : string): Observable<any>{
    const data = {
      Token : this.obtenerToken()
    };
    return this.http.get(`${this.ApiUrl}/RutasArticulos/${ruta}`);
  }

  //COMPRAS
  addCompra(data : any): Observable<any>{
    data["Token"] = this.obtenerToken();
    return this.http.post(`${this.ApiUrl}/compra`, data);
  }

}
