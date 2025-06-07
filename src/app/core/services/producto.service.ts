import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/products'; //endpoint del backend

  constructor(private http: HttpClient) { }

  getProductos(categoryId?: string): Observable<any> {
    if (categoryId && categoryId !== '') {
      return this.http.get(`${this.apiUrl}/category/${categoryId}`);
    }
    return this.http.get(this.apiUrl);
  }

  getProducto(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  // corregido endpoint para categorías
  getCategorias(): Observable<any> {
    return this.http.get(`http://localhost:8080/category`);
  }

  actualizarProducto(productoId: string, value: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productoId}`, value);
  }

  buscarProductos(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?search=${query}`);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
