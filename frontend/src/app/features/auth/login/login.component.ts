import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MfaVerificationComponent } from '../mfa-verification/mfa-verification.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MfaVerificationComponent],
  template: `
    <div class="container mt-5 text-center">
      <div class="card p-4 mx-auto" style="max-width: 400px;">
        <h3 class="mb-3">Login Mock</h3>
        <form *ngIf="!authService.isMfaRequired()" (ngSubmit)="submit()">
          <input [(ngModel)]="email" name="email" placeholder="Email" class="form-control mb-2" required />
          <input [(ngModel)]="password" name="password" placeholder="Password" type="password" class="form-control mb-2" required />
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>

        <app-mfa-verification *ngIf="authService.isMfaRequired()"></app-mfa-verification>

        <div class="mt-3" *ngIf="authService.isLoggedIn()">✅ Sesión activa</div>
        <pre class="text-start mt-3 bg-light p-2 small" *ngIf="authService.token()">{{ authService.token() }}</pre>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(public authService: AuthService) {}

  submit() {
    try {
      this.authService.login(this.email, this.password);
    } catch (e: any) {
      alert(e.message);
    }
  }
}
