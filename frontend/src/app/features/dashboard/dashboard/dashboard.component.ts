import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="container mt-5 text-center">
      <div class="card p-4 mx-auto" style="max-width: 400px;">
        <h3>Bienvenido al Dashboard</h3>
        <p>Estás autenticado correctamente</p>
        <button (click)="logout()" class="btn btn-danger mt-2">Cerrar sesión</button>
      </div>
    </div>
  `
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
