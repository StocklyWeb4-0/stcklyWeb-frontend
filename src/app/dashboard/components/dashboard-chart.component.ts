import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent {
  @Input() title: string = '';
  @Input() chartData: any = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [
      { data: [65, 59, 80, 81], label: 'Ventas' }
    ]
  };
  @Input() chartOptions: any = {
    responsive: true
  };
  chartType: keyof import('chart.js').ChartTypeRegistry = 'bar';
} 