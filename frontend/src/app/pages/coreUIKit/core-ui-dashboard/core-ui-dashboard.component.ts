import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  NavbarComponent,
  SidebarComponent,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  AlertComponent
} from '@coreui/angular';

@Component({
  selector: 'app-core-ui-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    NavbarComponent,
    SidebarComponent,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    AlertComponent
  ],
  templateUrl: './core-ui-dashboard.component.html',
  styleUrls: ['./core-ui-dashboard.component.scss'],
})
export class CoreUiDashboardComponent {
  sidebarVisible = true;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
