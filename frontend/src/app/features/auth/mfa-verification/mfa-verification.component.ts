import { Component, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TotpService } from '../../../core/services/totp.service';
import { MfaInputComponent } from '../../../shared/components/mfa-input/mfa-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mfa-verification',
  standalone: true,
  imports: [MfaInputComponent, CommonModule],
  template: `
    <div class="container mt-5">
      <div class="card p-4 mx-auto" style="max-width: 400px;">
        <h3 class="text-center mb-3">Verificación MFA</h3>
        <p>Ingresa el código de 6 dígitos de tu app autenticadora</p>
        <app-mfa-input (complete)="verifyCode($event)"></app-mfa-input>
        <div *ngIf="error()" class="alert alert-danger mt-2">{{ error() }}</div>
      </div>
    </div>
  `
})
export class MfaVerificationComponent {
  error = signal<string | null>(null);
  userId: string | null;

  constructor(
    private totpService: TotpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
  }

  verifyCode(code: string) {
    if (!this.userId) return;
    this.error.set(null);
    this.totpService.verifyCode(this.userId, code).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => this.error.set(err.message)
    });
  }
}
