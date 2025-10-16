import { Injectable, signal, effect } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TotpService {
  // Signal para el JWT generado tras MFA
  token = signal<string | null>(null);

  private readonly validCode = '123456'; // mock de código TOTP

  constructor() {
    // efecto para guardar token en localStorage
    effect(() => {
      const t = this.token();
      if (t) {
        localStorage.setItem('token', t);
      }
    });
  }

  verifyCode(userId: string, code: string): Observable<{ token: string }> {
    if (code === this.validCode) {
      const fakeJwt = this.generateFakeJwt(userId);
      this.token.set(fakeJwt);
      return of({ token: fakeJwt }).pipe(delay(500));
    } else {
      return throwError(() => new Error('Código MFA inválido'));
    }
  }

  private generateFakeJwt(userId: string): string {
    const payload = btoa(JSON.stringify({ sub: userId, name: 'Usuario MFA', role: 'admin' }));
    return `fake-header.${payload}.fake-signature`;
  }
}