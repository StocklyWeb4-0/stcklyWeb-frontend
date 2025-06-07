import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/core/services/factura.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EmailDialogComponent } from './email-dialog.component';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.scss']
})
export class FacturaListComponent implements OnInit {
  facturas: any[] = [];
  loading = false;
  displayedColumns: string[] = ['id', 'venta', 'fecha', 'cliente', 'total', 'acciones'];

  constructor(private facturaService: FacturaService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.loading = true;
    this.facturaService.getFacturas().subscribe({
      next: (data) => {
        this.facturas = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar facturas', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  descargarFactura(id: number) {
    this.facturaService.descargarFactura(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Factura_${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }, () => {
      this.snackBar.open('Error al descargar la factura', 'Cerrar', { duration: 3000 });
    });
  }

  enviarFactura(id: number) {
    const dialogRef = this.dialog.open(EmailDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((email: string | null) => {
      if (email) {
        this.facturaService.enviarFactura(id, email).subscribe({
          next: (res) => {
            this.snackBar.open(res.message || 'Factura enviada', 'Cerrar', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Error al enviar la factura', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
}

export { EmailDialogComponent }; 