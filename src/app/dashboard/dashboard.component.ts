import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards = [
    {
      title: 'Gestión de Productos',
      description: 'Administra el inventario de productos de tu tienda',
      value: '—',
      action: { label: 'CRUD PRODUCTOS', link: '/productos' }
    },
    {
      title: 'Usuarios',
      description: 'Gestiona los usuarios registrados',
      value: '—',
      action: { label: 'Ver Usuarios', link: '/usuarios' }
    },
    {
      title: 'Ventas',
      description: 'Consulta el historial de ventas',
      value: '—',
      action: { label: 'Ver Ventas', link: '/venta' }
    },
    {
      title: 'Ganancias',
      description: 'Visualiza las ganancias totales',
      value: '—',
      action: null
    }
  ];

  tableTitle = 'Últimos Usuarios';
  tableColumns = ['nombre', 'email', 'rol'];
  tableData = [
    { nombre: 'Juan Pérez', email: 'juan@mail.com', rol: 'admin' },
    { nombre: 'Ana López', email: 'ana@mail.com', rol: 'usuario' },
    { nombre: 'Carlos Ruiz', email: 'carlos@mail.com', rol: 'usuario' }
  ];

  chartData: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getResumen().subscribe(resumen => {
      this.cards = [
        {
          title: 'Gestión de Productos',
          description: 'Administra el inventario de productos de tu tienda',
          value: resumen.productos ?? '—',
          action: { label: 'CRUD PRODUCTOS', link: '/productos' }
        },
        {
          title: 'Usuarios',
          description: 'Gestiona los usuarios registrados',
          value: resumen.usuarios ?? '—',
          action: { label: 'Ver Usuarios', link: '/usuarios' }
        },
        {
          title: 'Ventas',
          description: 'Consulta el historial de ventas',
          value: resumen.ventas ?? '—',
          action: { label: 'Ver Ventas', link: '/venta' }
        },
        {
          title: 'Ganancias',
          description: 'Visualiza las ganancias totales',
          value: resumen.ganancias ?? '—',
          action: null
        }
      ];
    });
    this.dashboardService.getVentasPorMes().subscribe(data => {
      this.chartData = {
        labels: data.labels,
        datasets: [
          { data: data.values, label: 'Ventas' }
        ]
      };
    });
    this.dashboardService.getUltimosUsuarios().subscribe(usuarios => {
      this.tableData = usuarios;
    });
  }
}
