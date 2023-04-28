//Los guards son servicios, so tienen la misma estructura, la unica diferencia es que tinen que implementar
//una interfaz
//esta interfaz es dependiente de donde la quiero colocar, si cada que entre en una ruta, o cada vez que navegue, etc...
//test commit

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {

  constructor() { }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    console.log('Can Match');
    console.log({ route, segments });
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('Can Activate');
    console.log({ route, state });
    return true;
  }
}
