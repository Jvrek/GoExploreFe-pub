import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { filter, map, take } from 'rxjs/operators';
import { UserService } from '../shared/user/user.service';
import { Role } from '../shared/roles/roles.enum';
import { RolesService } from '../shared/roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private roleService: RolesService
  ) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
        if (isAuthenticated) {
          // Directly open inside area
          console.log('Found previous token, automatic login');
          if (this.roleService.checkAdminPermission())
            this.router.navigateByUrl('/menu/main', { replaceUrl: true });
          else this.router.navigateByUrl('/menu/main', { replaceUrl: true });
        } else {
          // Simply allow access to the login
          return true;
        }
      })
    );
  }
}
