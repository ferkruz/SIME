import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  estado: string;
  fecha: string;
}

@Component({
  selector: 'app-pdf-maker',
  standalone: true,
  imports: [
    CommonModule, // 👈 para ngClass
    FormsModule   // 👈 para ngModel
  ],
  templateUrl: './pdf-maker.component.html',
  styleUrls: ['./pdf-maker.component.scss'],
})
export class PdfMakerComponent {
  searchTerm = '';
  paginaActual = 1;
  itemsPorPagina = 5;
  columnaOrden = '';
  ordenAsc = true;

  usuarios: Usuario[] = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Admin', estado: 'Activo', fecha: '2025-01-10' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@example.com', rol: 'Usuario', estado: 'Activo', fecha: '2025-01-12' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@example.com', rol: 'Editor', estado: 'Suspendido', fecha: '2025-01-13' },
    { id: 4, nombre: 'María Torres', email: 'maria@example.com', rol: 'Usuario', estado: 'Activo', fecha: '2025-01-15' },
    { id: 5, nombre: 'Luis Fernández', email: 'luis@example.com', rol: 'Admin', estado: 'Activo', fecha: '2025-01-20' },
    { id: 6, nombre: 'Lucía Rivas', email: 'lucia@example.com', rol: 'Editor', estado: 'Activo', fecha: '2025-01-22' },
    { id: 7, nombre: 'Diego Castro', email: 'diego@example.com', rol: 'Usuario', estado: 'Suspendido', fecha: '2025-01-25' },
    { id: 8, nombre: 'Sofía Blanco', email: 'sofia@example.com', rol: 'Admin', estado: 'Activo', fecha: '2025-01-26' },
    { id: 9, nombre: 'Martín Ruiz', email: 'martin@example.com', rol: 'Usuario', estado: 'Activo', fecha: '2025-01-28' },
    { id: 10, nombre: 'Valentina Díaz', email: 'valentina@example.com', rol: 'Editor', estado: 'Activo', fecha: '2025-01-30' },
    { id: 11, nombre: 'Tomás Vega', email: 'tomas@example.com', rol: 'Usuario', estado: 'Suspendido', fecha: '2025-02-01' },
    { id: 12, nombre: 'Camila Herrera', email: 'camila@example.com', rol: 'Admin', estado: 'Activo', fecha: '2025-02-03' },
    { id: 13, nombre: 'Mateo López', email: 'mateo@example.com', rol: 'Usuario', estado: 'Activo', fecha: '2025-02-05' },
    { id: 14, nombre: 'Julia Morales', email: 'julia@example.com', rol: 'Editor', estado: 'Activo', fecha: '2025-02-08' },
    { id: 15, nombre: 'Agustín Méndez', email: 'agustin@example.com', rol: 'Usuario', estado: 'Suspendido', fecha: '2025-02-10' },
  ];

  get filteredUsers(): Usuario[] {
    let resultado = this.usuarios.filter(u =>
      Object.values(u).some(val => val.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
    );

    if (this.columnaOrden) {
      resultado.sort((a, b) => {
        const valA = (a as any)[this.columnaOrden];
        const valB = (b as any)[this.columnaOrden];
        return this.ordenAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }

    return resultado;
  }

  get paginatedUsers(): Usuario[] {
    const start = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.filteredUsers.slice(start, start + this.itemsPorPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPorPagina);
  }

  ordenarPor(columna: string) {
    if (this.columnaOrden === columna) {
      this.ordenAsc = !this.ordenAsc;
    } else {
      this.columnaOrden = columna;
      this.ordenAsc = true;
    }
  }

  getIconoOrden(columna: string): string {
    if (this.columnaOrden !== columna) return 'bi bi-arrow-down-up text-muted';
    return this.ordenAsc ? 'bi bi-arrow-up text-primary' : 'bi bi-arrow-down text-primary';
  }

  cambiarPagina(pagina: number) {
    if (pagina > 0 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  exportPDF() {
    const doc = new jsPDF();
    const title = this.searchTerm
      ? `Listado filtrado de usuarios ("${this.searchTerm}")`
      : 'Listado completo de usuarios';

    doc.setFontSize(16);
    doc.text(title, 14, 15);

    const body = this.filteredUsers.map(u => [
      u.id, u.nombre, u.email, u.rol, u.estado, u.fecha
    ]);

    autoTable(doc, {
      startY: 25,
      head: [['ID', 'Nombre', 'Email', 'Rol', 'Estado', 'Fecha']],
      body,
      theme: 'striped',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [33, 150, 243], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save('usuarios.pdf');
  }
}
