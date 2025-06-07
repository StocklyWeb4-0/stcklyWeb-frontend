import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = `${environment.apiUrl}/invoices`;

  constructor(private http: HttpClient) {}

  getFacturas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  descargarFactura(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/download`, { responseType: 'blob' });
  }

  enviarFactura(id: number, email?: string, isNonCreditClient?: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/send-invoice`, { email, isNonCreditClient });
  }

  // Método para compatibilidad con componentes antiguos
  enviarFacturaPorCorreo(id: number, email: string) {
    return this.enviarFactura(id, email);
  }
}
