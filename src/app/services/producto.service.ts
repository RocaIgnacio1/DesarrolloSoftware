import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private ApiUrl = 'http://localhost:3005' ;

  constructor(private http: HttpClient) { }

  getProductos(data: any): Observable<any>{
    return this.http.get(`${this.ApiUrl}/articulos`, data);
  }

  getProducto(data: any): Observable<any>{
    console.log(data)
    return this.http.post(`${this.ApiUrl}/onearticulo`, data);
  }
}
