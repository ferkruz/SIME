import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Rutas con lazy loading
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'mfa', 
    loadComponent: () => import('./features/auth/mfa-verification/mfa-verification.component').then(m => m.MfaVerificationComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'coreUIKit', 
    loadComponent: () => import('./pages/coreUIKit/core-ui-dashboard/core-ui-dashboard.component').then(m => m.CoreUiDashboardComponent)
  },
  { 
    path: 'pdfMaker', 
    loadComponent: () => import('./pages/pdf-maker/pdf-maker.component').then(m => m.PdfMakerComponent)
  },
  
  // Ruta wildcard para 404
  { path: '**', redirectTo: '/login' }
];