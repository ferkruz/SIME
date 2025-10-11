import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // Mejora el rendimiento del cambio de detección
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Ruteo principal de la aplicación
    provideRouter(routes),
    provideAnimationsAsync()
  ]
};
