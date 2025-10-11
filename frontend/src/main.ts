// src/main.ts (cliente)
import 'bootstrap/dist/css/bootstrap.min.css';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

async function main() {
  await bootstrapApplication(AppComponent, appConfig);
  if (typeof window !== 'undefined') {
    // carga el JS de Bootstrap sólo en el navegador
    await import('bootstrap');
  }
}
void main();
