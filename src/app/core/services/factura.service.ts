import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  // URL base hardcodeada para no depender de environment
  private apiUrl = 'http://localhost:8080/facturas';
  
  constructor(private http: HttpClient) {}
  
  enviarFacturaPorCorreo(idVenta: number, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar-correo`, { idVenta, email });
  }
}