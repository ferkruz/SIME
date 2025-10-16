import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="container mt-5 text-center">
      <div class="card p-4 mx-auto" style="max-width: 500px;">
        <h3>Bienvenido, {{ user()?.name || 'Usuario' }}</h3>
        <p>Email: {{ user()?.email }}</p>

        <button class="btn btn-danger mt-3" (click)="logout()">Cerrar sesión</button>
      </div>
    </div>
  `
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  get user() {
    return this.authService.user;
  }

  logout() {
    this.authService.logout();
  }
}