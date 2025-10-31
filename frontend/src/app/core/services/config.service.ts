import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

export interface AppConfig {
  apiBaseUrl: string;
  cysBaseUrl: string;
  reCaptchaPublicKey: string;
  featureFlags: Record<string, boolean>;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  public config = signal<AppConfig | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Carga la configuración según el entorno: 'dev' o 'dist'
   */
  loadConfig(env: 'dev' | 'dist'): Promise<void> {
    const path = `/assets/config/config-${env}.json`;
    return this.http.get<AppConfig>(path).toPromise().then(cfg => {
      this.config.set(cfg ?? null); // Seguridad si cfg undefined
    });
  }
}