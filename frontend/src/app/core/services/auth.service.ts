import { Injectable, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginResponse } from '../../shared/models/auth';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: User[] = [
    { id: '1', email: 'user@demo.com', name: 'Usuario Demo', mfaEnabled: false },
    { id: '2', email: 'admin@demo.com', name: 'Administrador MFA', mfaEnabled: true }
  ];

  token = signal<string | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor(private router: Router) {
    // inicializar signals desde localStorage SOLO en navegador
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('token');
      this.token.set(stored);
      this.isLoggedIn.set(!!stored);
    }

    effect(() => {
      if (typeof window === 'undefined') return;
      const t = this.token();
      if (t) {
        localStorage.setItem('token', t);
        this.isLoggedIn.set(true);
      } else {
        localStorage.removeItem('token');
        this.isLoggedIn.set(false);
      }
    });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const user = this.mockUsers.find(u => u.email === email);
    if (!user || password !== '123456') {
      return throwError(() => new Error('Credenciales inválidas'));
    }

    if (user.mfaEnabled) {
      return of({ mfaRequired: true, userId: user.id }).pipe(delay(500));
    } else {
      const fakeToken = this.generateFakeJwt(user);
      this.token.set(fakeToken);
      return of({ mfaRequired: false, token: fakeToken }).pipe(delay(500));
    }
  }

  logout() {
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  private generateFakeJwt(user: User): string {
    const payload = btoa(JSON.stringify({ sub: user.id, name: user.name, email: user.email }));
    return `fake-header.${payload}.fake-signature`;
  }
}