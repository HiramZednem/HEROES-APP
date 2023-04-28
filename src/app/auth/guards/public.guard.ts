import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.checkAuthentication() //Regresa un false si no, un true si si
      .pipe(
        tap((isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigate(['/heroes'])
          }
        }),
        map( isAut => !isAut )
      )
  }

}
