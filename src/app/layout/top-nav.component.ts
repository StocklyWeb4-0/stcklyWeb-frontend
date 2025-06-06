import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationService } from './navigation.service';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(private navigationService: NavigationService, public authService: AuthService) {}
    ngOnInit() {}
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
    logout() {
        this.authService.logout();
    }
}
