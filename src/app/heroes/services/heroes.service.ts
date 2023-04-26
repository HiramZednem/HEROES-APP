import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Hero } from '../interface/hero.interface';
import { catchError, Observable, of } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  //aqui cree un nuevo metodo para poder obtener el heroe que necesito.
  getHeroById( id: string ): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${ id }`)
      .pipe(
        //para manejar el error, manejo la data con un pipe, si el pipe me dice, hey carnal hay un error cae en la funcion de abajo
        //una vez aca, ejecuta lo que tengamos por aca, en este caso of es de rxjs y regresa un observable
        catchError( error => of(undefined) )
      );
  }

  getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${ query }&_limit=6`)
  }
}
