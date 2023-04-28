import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User

  constructor(private http: HttpClient) { }

  get currentUser(): User|undefined {
    if ( !this.user ) return undefined;
    //este es un metodo para evitar pasar por referencia y es mejor que el spread
    return structuredClone(this.user);
  }

  login( email: string, password: string ):Observable<User> {
    //http.post('login', {email, password}) -> de esta manera se hace con un backend real

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', 'Aeuhd13Ju.aRsAOa.aIeUkas')) //los tokens se deberian guardar en cookies que pasen por https
      );
  }

  logout() {
    localStorage.clear();
  }


}
