import 'bootstrap/dist/css/bootstrap.min.css';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

async function main() {
  const env = environment.production ? 'dist' : 'dev';
  const configPath = `/assets/config/config-${env}.json`;

  // Cargar configuración con fetch antes del bootstrap
  const response = await fetch(configPath);
  if (!response.ok) {
    throw new Error(`No se pudo cargar la configuración: ${configPath}`);
  }
  const configData = await response.json();

  // Bootstrap de la app, pasando la config como provider
  await bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      provideHttpClient(),
      { provide: 'APP_CONFIG', useValue: configData }, // Config inyectable en la app
      ...(appConfig.providers ?? [])
    ]
  });

  // Importar JS de Bootstrap en navegador
  if (typeof window !== 'undefined') {
    await import('bootstrap');
  }

  // Remover loader inicial si existe
  const loader = document.getElementById('initial-loader');
  if (loader) loader.remove();
}

void main();
