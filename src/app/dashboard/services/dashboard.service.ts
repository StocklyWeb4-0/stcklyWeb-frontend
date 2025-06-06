import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getResumen(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumen`);
  }

  getVentasPorMes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ventas-por-mes`);
  }

  getUltimosUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ultimos-usuarios`);
  }
} 