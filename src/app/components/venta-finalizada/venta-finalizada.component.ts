import { Component, Input } from '@angular/core';
import { FacturaService } from '../../core/services/factura.service';

@Component({
  selector: 'app-venta-finalizada',
  templateUrl: './venta-finalizada.component.html',
  styleUrls: ['./venta-finalizada.component.scss']
})
export class VentaFinalizadaComponent {
  @Input() resumenVenta: any;

  emailCliente: string = '';
  enviado: boolean = false;
  error: string | null = null;

  constructor(private facturaService: FacturaService) {}

  imprimirFactura(): void {
    window.print();
  }

  enviarFactura(): void {
    if (!this.emailCliente) {
      this.error = 'Por favor ingresa un email válido.';
      return;
    }

    if (!this.resumenVenta?.id) {
      this.error = 'No se encontró el ID de la venta.';
      return;
    }

    this.facturaService.enviarFacturaPorCorreo(this.resumenVenta.id, this.emailCliente)
      .subscribe({
        next: () => {
          this.enviado = true;
          this.error = null;
        },
        error: (err: any) => {
          this.enviado = false;
          this.error = 'Error al enviar la factura: ' + (err?.error?.message || 'Intenta nuevamente');
        }
      });
  }
}
