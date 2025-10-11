import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bootstrap-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bootstrap-table.component.html',
  styleUrls: ['./bootstrap-table.component.scss'],
})
export class BootstrapTableComponent {
  datos = signal<any[]>([
    { id: 1, nombre: 'Ana', email: 'ana@mail.com', rol: 'Admin' },
    { id: 2, nombre: 'Luis', email: 'luis@mail.com', rol: 'Editor' },
    { id: 3, nombre: 'María', email: 'maria@mail.com', rol: 'Usuario' },
    { id: 4, nombre: 'Carlos', email: 'carlos@mail.com', rol: 'Usuario' },
    { id: 5, nombre: 'Elena', email: 'elena@mail.com', rol: 'Editor' },
    { id: 6, nombre: 'Jorge', email: 'jorge@mail.com', rol: 'Usuario' },
    { id: 7, nombre: 'Marta', email: 'marta@mail.com', rol: 'Admin' },
    { id: 8, nombre: 'Pedro', email: 'pedro@mail.com', rol: 'Editor' },
    { id: 9, nombre: 'Lucía', email: 'lucia@mail.com', rol: 'Usuario' },
    { id: 10, nombre: 'Diego', email: 'diego@mail.com', rol: 'Admin' },
    { id: 11, nombre: 'Sofía', email: 'sofia@mail.com', rol: 'Editor' },
    { id: 12, nombre: 'Tomás', email: 'tomas@mail.com', rol: 'Usuario' },
    { id: 13, nombre: 'Valentina', email: 'valentina@mail.com', rol: 'Admin' },
    { id: 14, nombre: 'Bruno', email: 'bruno@mail.com', rol: 'Usuario' },
    { id: 15, nombre: 'Camila', email: 'camila@mail.com', rol: 'Editor' },
  ]);

  columnas = computed(() => {
    const d = this.datos();
    return d.length > 0 ? Object.keys(d[0]) : [];
  })();

  filtroValue = signal('');
  get filtro(): string {
    return this.filtroValue();
  }
  set filtro(value: string) {
    this.filtroValue.set(value);
    this.paginaActual.set(1);
  }

  columnaOrden = signal<string>(this.columnas[0] || '');
  ascendente = signal(true);
  paginaActual = signal(1);
  registrosPorPagina = 5;

  filtrados = computed(() => {
    const term = this.filtro.toLowerCase();
    return this.datos().filter((item) =>
      Object.values(item).some((v) => String(v).toLowerCase().includes(term))
    );
  });

  ordenados = computed(() => {
    const col = this.columnaOrden();
    const asc = this.ascendente();
    return [...this.filtrados()].sort((a, b) => {
      const valA = a[col];
      const valB = b[col];
      if (valA < valB) return asc ? -1 : 1;
      if (valA > valB) return asc ? 1 : -1;
      return 0;
    });
  });

  paginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.registrosPorPagina;
    return this.ordenados().slice(inicio, inicio + this.registrosPorPagina);
  });

  totalPaginas = computed(() =>
    Math.ceil(this.filtrados().length / this.registrosPorPagina)
  );

  totalPaginasArray(): number[] {
    return Array.from({ length: this.totalPaginas() }, (_, i) => i + 1);
  }

  ordenarPor(col: string): void {
    if (this.columnaOrden() === col) {
      this.ascendente.set(!this.ascendente());
    } else {
      this.columnaOrden.set(col);
      this.ascendente.set(true);
    }
  }

  getIconoOrden(col: string): string {
    if (this.columnaOrden() !== col) return 'bi bi-arrow-down-up';
    return this.ascendente() ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaActual.set(pagina);
    }
  }
}
