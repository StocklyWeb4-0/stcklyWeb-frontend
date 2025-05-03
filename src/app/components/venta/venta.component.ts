import { Component } from '@angular/core';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent {
  ventaFinalizada: boolean = false;
  resumenVenta: any;

  finalizarVenta() {
    // Aquí deberías generar el resumen real desde el carrito, productos, etc.
    this.resumenVenta = {
      id: 123,
      total: 55000,
      items: [
        { nombre: 'Producto A', cantidad: 2, precio: 15000 },
        { nombre: 'Producto B', cantidad: 1, precio: 25000 }
      ]
    };
    this.ventaFinalizada = true;
  }
}
