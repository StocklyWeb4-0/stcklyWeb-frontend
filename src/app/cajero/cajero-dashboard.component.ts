import { Component, OnInit } from '@angular/core';
import { CajeroDashboardService } from './services/cajero-dashboard.service';

@Component({
  selector: 'app-cajero-dashboard',
  templateUrl: './cajero-dashboard.component.html',
  styleUrls: ['./cajero-dashboard.component.scss']
})
export class CajeroDashboardComponent implements OnInit {
  cards = [
    {
      title: 'Registrar Venta',
      description: 'Registra una nueva venta en el sistema',
      action: { label: 'Nueva Venta', link: '/venta' }
    },
    {
      title: 'Historial de Ventas',
      description: 'Consulta el historial de ventas realizadas',
      action: { label: 'Ver Ventas', link: '/venta' }
    },
    {
      title: 'Pagos de Créditos',
      description: 'Registra y consulta pagos de créditos',
      action: { label: 'Gestión de Créditos', link: '/creditos' }
    },
    {
      title: 'Clientes',
      description: 'Consulta y gestiona los clientes',
      action: { label: 'Ver Clientes', link: '/clientes' }
    },
    {
      title: 'Productos',
      description: 'Consulta el inventario de productos',
      action: { label: 'Ver Productos', link: '/productos' }
    },
    {
      title: 'Facturas',
      description: 'Descarga y envía facturas a los clientes',
      action: { label: 'Ver Facturas', link: '/facturas' }
    }
  ];

  ventasChartData: any;
  creditosTableData: any[] = [];
  clientesTableData: any[] = [];

  constructor(private cajeroDashboardService: CajeroDashboardService) {}

  ngOnInit(): void {
    console.log('CajeroDashboardComponent cargado');
    this.cajeroDashboardService.getVentasPorMes().subscribe({
      next: data => {
        console.log('Ventas por mes:', data);
        this.ventasChartData = {
          labels: data.labels,
          datasets: [
            { data: data.values, label: 'Ventas' }
          ]
        };
      },
      error: err => {
        console.error('Error al obtener ventas por mes:', err);
      }
    });
    this.cajeroDashboardService.getUltimosCreditos().subscribe({
      next: creditos => {
        console.log('Créditos recientes:', creditos);
        this.creditosTableData = creditos;
      },
      error: err => {
        console.error('Error al obtener créditos recientes:', err);
      }
    });
    this.cajeroDashboardService.getUltimosClientes().subscribe({
      next: clientes => {
        console.log('Clientes recientes:', clientes);
        this.clientesTableData = clientes;
      },
      error: err => {
        console.error('Error al obtener clientes recientes:', err);
      }
    });
  }
} 