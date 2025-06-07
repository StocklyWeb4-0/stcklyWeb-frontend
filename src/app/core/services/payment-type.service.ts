import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  private apiUrl = `${environment.apiUrl}/payment-types`;

  constructor(private http: HttpClient) {}

  getPaymentTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createPaymentType(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  updatePaymentType(id: number, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deletePaymentType(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
} 