import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CajeroDashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVentasPorMes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sale?groupBy=month`);
  }

  getUltimosCreditos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/credits?limit=5&sort=desc`);
  }

  getUltimosClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers?limit=5&sort=desc`);
  }
} 