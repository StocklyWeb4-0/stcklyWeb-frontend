import { Component, OnInit } from '@angular/core';
import { ProductCategoriesService } from '../core/services/product-categories.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit{
  // Este componente sirve como contenedor para los componentes de gestión de productos
  categorias: any[] = [];

  constructor(private productCategoriesService: ProductCategoriesService) {}

  ngOnInit(): void {
    this.cargarCategorias(); // Cargar las categorías al inicializar el componente
  }

  cargarCategorias(): void {
    this.productCategoriesService.getCategories().subscribe(
      (data) => {
        this.categorias = data; // Asignar las categorías obtenidas
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  onCategoriaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Aseguramos que el target es un <select>
    const categoriaId = selectElement.value; // Obtenemos el valor seleccionado
    console.log('Categoría seleccionada:', categoriaId);
    // Aquí puedes implementar la lógica para filtrar productos por categoría
  }
}
