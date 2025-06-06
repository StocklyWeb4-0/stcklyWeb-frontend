import { Component, Input } from '@angular/core';
import { SideNavItem } from './navigation.model';
import { IconName } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'sb-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.scss']
})
export class SideNavItemComponent {
  @Input() sideNavItem?: SideNavItem;
  expanded = false;

  get iconName(): IconName | undefined {
    return this.sideNavItem?.icon as IconName;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }
} 