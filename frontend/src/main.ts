// src/main.ts (cliente)
import 'bootstrap/dist/css/bootstrap.min.css';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

async function main() {
  async function main() {
  await bootstrapApplication(AppComponent, appConfig);
  if (typeof window !== 'undefined') {
    await import('bootstrap');
  }

  const loader = document.getElementById('initial-loader');
  if (loader) loader.remove();
}
void main();

}
void main();