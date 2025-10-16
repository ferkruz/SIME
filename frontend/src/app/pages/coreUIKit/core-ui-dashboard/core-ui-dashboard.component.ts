// src/app/pages/coreUIKit/core-ui-dashboard/core-ui-dashboard.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  NavbarComponent,
  SidebarComponent,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  ButtonDirective,
  AlertComponent,
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-core-ui-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    NavbarComponent,
    SidebarComponent,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ButtonDirective,
    AlertComponent,
    ChartjsComponent,
  ],
  templateUrl: './core-ui-dashboard.component.html',
  styleUrls: ['./core-ui-dashboard.component.scss'],
})
export class CoreUiDashboardComponent {
  sidebarVisible = signal(true);
  showAlert = signal(true);
  showDark = signal(true);
  isOpen = false;

  toggleSidebar() {
    this.sidebarVisible.update((value) => !value);
  }

  // Datos para el gráfico de barras
  barData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas',
        data: [500, 700, 800, 600, 750, 900],
        backgroundColor: 'rgba(13,110,253,0.5)',
        borderColor: '#0d6efd',
        borderWidth: 1,
      },
    ],
  };

  barOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
    },
    scales: { y: { beginAtZero: true } },
  };

// Datos para el scatter chart con varias líneas
scatterData = {
  datasets: [
    {
      label: 'Ministerio de Salud',
      data: [
        { x: 0, y: 0 },
        { x: 1, y: 10 },
        { x: 2, y: 15 },
        { x: 3, y: 12 },
        { x: 4, y: 20 },
        { x: 5, y: 8 },
      ],
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,0.3)',
      showLine: true,
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Ministerio de Educación',
      data: [
        { x: 0, y: 0 },
        { x: 1, y: 5 },
        { x: 2, y: 12 },
        { x: 3, y: 18 },
        { x: 4, y: 14 },
        { x: 5, y: 10 },
      ],
      borderColor: 'rgba(54,162,235,1)',
      backgroundColor: 'rgba(54,162,235,0.3)',
      showLine: true,
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Ministerio de Economía',
      data: [
        { x: 0, y: 0 },
        { x: 1, y: 8 },
        { x: 2, y: 10 },
        { x: 3, y: 15 },
        { x: 4, y: 12 },
        { x: 5, y: 18 },
      ],
      borderColor: 'rgba(255,206,86,1)',
      backgroundColor: 'rgba(255,206,86,0.3)',
      showLine: true,
      fill: false,
      tension: 0.4,
    },
  ],
};

scatterOptions = {
  responsive: true,
  plugins: {
    legend: { display: true, position: 'top' },
    tooltip: {
      enabled: false, // 👈 deshabilitamos el tooltip interno
      external: (context: any) => {
        let tooltipEl = document.getElementById('custom-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'custom-tooltip';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.background = 'rgba(0,0,0,0.8)';
          tooltipEl.style.color = '#fff';
          tooltipEl.style.padding = '8px 10px';
          tooltipEl.style.borderRadius = '6px';
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.transition = '0.1s ease';
          document.body.appendChild(tooltipEl);
        }

        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = '0';
          return;
        }

        // Posicionamos el tooltip a la derecha del gráfico
        const { chart } = context;
        const chartRect = chart.canvas.getBoundingClientRect();

        tooltipEl.innerHTML = tooltipModel.dataPoints
          .map((dp: any) => `<b>${dp.dataset.label}</b>: (${dp.parsed.x}, ${dp.parsed.y})`)
          .join('<br>');

        tooltipEl.style.opacity = '1';
        tooltipEl.style.left = chartRect.right + 20 + 'px'; // 👉 margen derecho
        tooltipEl.style.top = chartRect.top + 'px';
      }
    }
  },
  scales: {
    x: { beginAtZero: true, title: { display: true, text: 'Eje X' } },
    y: { beginAtZero: true, title: { display: true, text: 'Eje Y' } },
  }
};


  // Datos para gráfico tipo tarta
  pieData = {
    labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
    datasets: [
      {
        data: [300, 150, 100, 50],
        backgroundColor: [
          'rgba(13,110,253,0.7)',
          'rgba(40,167,69,0.7)',
          'rgba(255,193,7,0.7)',
          'rgba(220,53,69,0.7)',
        ],
        borderColor: ['#0d6efd', '#28a745', '#ffc107', '#dc3545'],
        borderWidth: 1,
      },
    ],
  };

  pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // Datos para gráfico de líneas
  lineData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ingresos',
        data: [5000, 7000, 6500, 8000, 7500, 9000],
        borderColor: 'rgba(13,110,253,0.9)',
        backgroundColor: 'rgba(13,110,253,0.2)',
        fill: true, // Relleno debajo de la línea
        tension: 0.4, // Curvatura de la línea
      },
    ],
  };

  lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Ingresos ($)' } },
      x: { title: { display: true, text: 'Mes' } },
    },
  };

  presupuestosData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Economía',
        data: [12000, 12500, 13000, 12800, 13500],
        backgroundColor: 'rgba(13,110,253,0.7)', // azul
      },
      {
        label: 'Salud',
        data: [9500, 9700, 9400, 9800, 10000],
        backgroundColor: 'rgba(25,135,84,0.7)', // verde
      },
      {
        label: 'Defensa',
        data: [7000, 7200, 7500, 7600, 7700],
        backgroundColor: 'rgba(220,53,69,0.7)', // rojo
      },
      {
        label: 'Relaciones Exteriores',
        data: [4000, 4200, 4100, 4300, 4400],
        backgroundColor: 'rgba(255,193,7,0.7)', // amarillo
      },
      {
        label: 'Interior',
        data: [10500, 10800, 11000, 11200, 11500],
        backgroundColor: 'rgba(13,202,240,0.7)', // celeste
      },
    ],
  };

  presupuestosOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evolución del presupuesto por ministerio (millones ARS)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Millones de ARS',
        },
      },
    },
  };

  /* presupuestosOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right', // 👉 Muestra la leyenda a la derecha
        labels: {
          boxWidth: 15,
          padding: 10,
        },
      },
      title: {
        display: true,
        text: 'Evolución del Presupuesto por Ministerio (en millones de ARS)',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Presupuesto (millones ARS)',
        },
      },
    },
  }; */
}
