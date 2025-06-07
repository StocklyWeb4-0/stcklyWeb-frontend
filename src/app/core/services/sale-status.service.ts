import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleStatusService {
  private apiUrl = `${environment.apiUrl}/sale-status`;

  constructor(private http: HttpClient) {}

  getSaleStatuses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createSaleStatus(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateSaleStatus(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteSaleStatus(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
} 