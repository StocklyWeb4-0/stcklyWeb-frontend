import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
    FontAwesomeModule
  ],
  exports: [
    LayoutDashboardComponent
  ],
  providers: [NavigationService]
})
export class LayoutModule {} 