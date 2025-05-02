import { Component, Input } from '@angular/core';

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

  imprimirFactura() {
    window.print(); // Puedes personalizar esto luego con una vista de impresión
  }

  enviarFactura() {
    if (!this.emailCliente) {
      this.error = 'Por favor ingresa un email válido.';
      return;
    }

    // Aquí se simula el envío. Luego conectamos con el backend.
    console.log('Enviando factura a:', this.emailCliente);
    this.enviado = true;
    this.error = null;
  }
}
