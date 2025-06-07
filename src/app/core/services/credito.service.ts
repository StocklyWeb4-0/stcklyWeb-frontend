import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Credito {
  id: number;
  total: number;
  sale: {
    id: number;
    customer: {
      id: number;
      name: string;
    };
  };
  statusCredit: {
    id: number;
    name: string;
  };
  paymentDeadline: string;
  createdAt: string;
  totalPayments: number;
  paymentCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private apiUrl = `${environment.apiUrl}/credits`;
  private paymentStatusUrl = `${environment.apiUrl}/status-credits`;

  constructor(private http: HttpClient) {}

  getCreditos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEstadoPagos(): Observable<any[]> {
    return this.http.get<any[]>(this.paymentStatusUrl);
  }

  deleteEstadoCredito(id: number): Observable<void> {
    return this.http.delete<void>(`${this.paymentStatusUrl}/${id}`);
  }

  updateEstadoCredito(id: number, data: any): Observable<void> {
    return this.http.patch<void>(`${this.paymentStatusUrl}/${id}`, data);
  }

  createEstadoCredito(data: any): Observable<void> {
    return this.http.post<void>(this.paymentStatusUrl, data);
  }

  getCredito(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCredito(credito: Partial<Credito>): Observable<Credito> {
    return this.http.post<Credito>(this.apiUrl, credito);
  }

  updateCredito(id: number, credito: Partial<Credito>): Observable<Credito> {
    return this.http.patch<Credito>(`${this.apiUrl}/${id}`, credito);
  }

  deleteCredito(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
