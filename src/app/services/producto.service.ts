import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private ApiUrl = 'http://localhost:3005' ;

  constructor(private http: HttpClient) { }


  // PRODUCTO
  getProductos(data: any): Observable<any>{
    return this.http.post(`${this.ApiUrl}/allarticulos`, data);
  }

  getProducto(data: any): Observable<any>{
    console.log(data)
    return this.http.post(`${this.ApiUrl}/onearticulo`, data);
  }

  addProducto(data: any): Observable<any>{
    console.log(data)
    return this.http.post(`${this.ApiUrl}/articulo`, data);
  }

  //CATEGORIAS
  getCategorias(data: any): Observable<any>{
    return this.http.post(`${this.ApiUrl}/allcategorias`, data);
  }

  //CONTENIDOS 
  updateContenidos(data: any): Observable<any>{
    return this.http.put(`${this.ApiUrl}/contenido`, data);
  }

  //CATACTERISTICAS
  getCaracteristicas(data: any): Observable<any>{
    return this.http.post(`${this.ApiUrl}/allcaracteristicas`, data);
  }

  //LOGIN
  login(data: any): Observable<any>{
    return this.http.post(`${this.ApiUrl}/login`, data);
  }

  //FOTOS
  addFoto(id : number, data: any): Observable<any>{
    return this.http.post(`${this.ApiUrl}/fotos/${id}`, data);
  }

}
