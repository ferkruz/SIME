import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { type BootstrapContext } from '@angular/platform-browser';

// 👇 IMPORTANTE: aceptar el contexto del servidor (requerido por Vite SSR)
export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(AppComponent, config, context);
}
