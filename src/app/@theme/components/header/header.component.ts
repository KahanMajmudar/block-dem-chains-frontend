import { Component, OnDestroy, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbSearchService, NbToastrService, NbDialogService, NbWindowService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { AuthService } from '../../../auth/shared/auth.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../../../common/data/global-constants';
import { UserService } from '../../../shared/user.service';
import { UserSearchResultsComponent } from '../../../pages/user/user-search-results/user-search-results.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, {title: 'View transactions'}, { title: 'Log out' }];
  public userIDToSearch;

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private searchService: NbSearchService,
    private toastrService: NbToastrService,
    private windowService: NbDialogService
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        console.log(data);
        this.userIDToSearch = data.term;
        var addressObj = { address: this.userIDToSearch };

        this.userService.viewUserInfo(addressObj)
          .subscribe((data: any) => {
            console.log(data);
            if (!data.isUser) {
              this.toastrService.show('No such user!', 'Please verify user ID', { status: "danger", limit: 3, duration: 3000 });
              return;
            }
            const context = { userDetails: data, ID: this.userIDToSearch };
            this.windowService.open(UserSearchResultsComponent, { context } );
          }, (error: any) => {
            console.log(error);
            this.toastrService.show('No user with that ID!', 'Please verify user ID!', { status: "danger", limit: 3 });
          })
      })
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    GlobalConstants.userName = localStorage.getItem('user-name');
    this.user = {
      name: GlobalConstants.userName.charAt(0).toUpperCase() + GlobalConstants.userName.slice(1)
    }

    this.menuService.onItemClick()
      .subscribe((event) => {
        if (event.item.title === "Log out") {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
        else if (event.item.title === "Profile") {
          this.router.navigate(['/pages/profile']);
        }
        else if (event.item.title === "View transactions") {
          this.router.navigate(['/pages/transactions'])
        }
      })

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
