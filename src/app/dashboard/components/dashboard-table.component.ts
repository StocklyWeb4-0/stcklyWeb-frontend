import { Component, Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss'],
  providers: [TitleCasePipe]
})
export class DashboardTableComponent {
  @Input() title: string = '';
  @Input() columns: string[] = [];
  @Input() data: any[] = [];

  constructor(public titleCasePipe: TitleCasePipe) {}
} 