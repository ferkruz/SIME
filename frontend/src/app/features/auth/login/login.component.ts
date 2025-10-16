import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container mt-5">
      <div class="card p-4 mx-auto" style="max-width: 400px;">
        <h3 class="text-center mb-3">Login</h3>
        <div class="mb-2">
          <input [(ngModel)]="email" placeholder="Email" class="form-control" />
        </div>
        <div class="mb-2">
          <input [(ngModel)]="password" type="password" placeholder="Password" class="form-control" />
        </div>
        <button (click)="login()" class="btn btn-primary w-100">Ingresar</button>
        <div *ngIf="error()" class="alert alert-danger mt-3">{{ error() }}</div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.error.set(null);
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        if (res.mfaRequired) {
          this.router.navigate(['/mfa'], { queryParams: { userId: res.userId } });
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: err => this.error.set(err.message)
    });
  }
}