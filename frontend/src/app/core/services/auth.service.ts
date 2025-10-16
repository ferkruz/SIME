import { Injectable, signal, effect } from '@angular/core';

export interface User {
  email: string;
  name: string;
  mfaEnabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = signal(false);
  isMfaRequired = signal(false);
  user = signal<User | null>(null);
  token = signal<string | null>(null);

  private mockUsers: User[] = [
    { email: 'user@demo.com', name: 'Usuario Demo', mfaEnabled: false },
    { email: 'admin@demo.com', name: 'Admin MFA', mfaEnabled: true }
  ];
  private password = '123456';

  constructor() {
    if (typeof window !== 'undefined') {
      // Recuperar sesión desde localStorage
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken && storedUser) {
        this.token.set(storedToken);
        this.user.set(JSON.parse(storedUser));
        this.isLoggedIn.set(true);
      }

      // Sincronizar signals con localStorage
      effect(() => {
        if (this.isLoggedIn()) {
          localStorage.setItem('token', this.token() || '');
          localStorage.setItem('user', JSON.stringify(this.user()));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      });
    }
  }

  login(email: string, password: string) {
    const found = this.mockUsers.find(u => u.email === email);
    if (!found || password !== this.password) {
      throw new Error('Credenciales inválidas');
    }

    if (found.mfaEnabled) {
      this.user.set(found);
      this.isMfaRequired.set(true);
    } else {
      this.user.set(found);
      this.isLoggedIn.set(true);
      this.token.set(this.generateToken(found));
    }
  }

  verifyMfa(code: string) {
    if (code === '123456') {
      this.isMfaRequired.set(false);
      this.isLoggedIn.set(true);
      if (this.user()) this.token.set(this.generateToken(this.user()!));
    } else {
      throw new Error('Código MFA inválido');
    }
  }

  logout() {
    this.isLoggedIn.set(false);
    this.user.set(null);
    this.token.set(null);
    this.isMfaRequired.set(false);
  }

  private generateToken(user: User) {
    return btoa(JSON.stringify({ email: user.email, name: user.name }));
  }
}