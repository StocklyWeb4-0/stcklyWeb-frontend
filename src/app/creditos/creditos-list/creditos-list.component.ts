import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Credito, CreditoService } from '../../core/services/credito.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creditos-list',
  templateUrl: './creditos-list.component.html',
  styleUrls: ['./creditos-list.component.scss']
})
export class CreditosListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['saleId', 'cliente', 'total', 'paymentDeadline', 'statusCredit'];
  dataSource = new MatTableDataSource<Credito>();
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private creditoService: CreditoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit CreditosListComponent');
    this.cargarCreditos();
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit CreditosListComponent');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarCreditos(): void {
    console.log('Ejecutando cargarCreditos');
    this.creditoService.getCreditos().subscribe({
      next: (data) => {
        console.log('Datos recibidos de créditos:', data);
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
  error: (err) => {
    console.error('Error al obtener créditos:', err);
    this.errorMessage = 'Error al cargar créditos: ' + (err.message || err.statusText);
    this.snackBar.open('Error al cargar créditos', 'Cerrar', { duration: 3000 });
  }
    });
  }

  aplicarFiltro(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}
