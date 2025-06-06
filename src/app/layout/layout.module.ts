import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Component, Input } from '@angular/core';
import { SideNavItem } from './navigation.model';
import { NavigationService } from './navigation.service';

import { LayoutDashboardComponent } from './layout-dashboard.component';
import { SideNavComponent } from './side-nav.component';
import { TopNavComponent } from './top-nav.component';
import { FooterComponent } from './footer.component';
import { SideNavItemComponent } from './side-nav-item.component';

@NgModule({
  declarations: [
    LayoutDashboardComponent,
    SideNavComponent,
    TopNavComponent,
    FooterComponent,
    SideNavItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  exports: [
    LayoutDashboardComponent
  ],
  providers: [NavigationService]
})
export class LayoutModule {}
