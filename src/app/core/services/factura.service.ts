import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = `${environment.apiUrl}/facturas`; // ✅ Usar backticks correctamente

  constructor(private http: HttpClient) {}

  enviarFacturaPorCorreo(idVenta: number, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar-correo`, { idVenta, email }); // ✅ Usar backticks aquí también
  }
}
