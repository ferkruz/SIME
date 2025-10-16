import { Route } from '@angular/router';
import { CoreUiDashboardComponent } from './pages/coreUIKit/core-ui-dashboard/core-ui-dashboard.component';
import { AppComponent } from './app.component';
import { PdfMakerComponent } from './pages/pdf-maker/pdf-maker.component';
import { LoginComponent } from './features/auth/login/login.component';
import { MfaVerificationComponent } from './features/auth/mfa-verification/mfa-verification.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Route[] = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'coreUIKit', component: CoreUiDashboardComponent },
  { path: 'pdfMaker', component: PdfMakerComponent },

  { path: 'login', component: LoginComponent },
  { path: 'mfa', component: MfaVerificationComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

