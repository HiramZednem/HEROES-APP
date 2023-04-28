//Los guards son servicios, so tienen la misma estructura, la unica diferencia es que tinen que implementar
//una interfaz
//esta interfaz es dependiente de donde la quiero colocar, si cada que entre en una ruta, o cada vez que navegue, etc...
//test commit

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): Observable<boolean> | boolean  {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigate(['./auth/login'])
          }
        })
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    console.log('Can Match');
    console.log({ route, segments });
    return this.checkAuthStatus(); //para que las vistas se muestren tengo que regresar un true
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('Can Activate');
    console.log({ route, state });
    return this.checkAuthStatus();
  }
}
