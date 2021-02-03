import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {
  activatedPath = '';

  pages = [
    {
      title: 'Strona główna',
      url: '/menu/main'
    },
    {
      title: 'Lokacje',
      url: '/menu/locations'
    },
    {
      title: 'Moje lokacje',
      url: '/menu/owned-locations'
    },
    {
      title: 'Użytkownicy',
      url: '/menu/users'
    },
    {
      title: 'Nieaktywne konta',
      url: '/menu/unactive-users'
    },
    {
      title: 'Ustawienia konta',
      url: '/menu/account-settings'
    }
  ];
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.activatedPath = event.url;
      }
    });
  }

  ngOnInit() {}

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
