import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interface/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private heroService:HeroesService,
    //nos sirve para obtener los parametros de nuestars url
    private activatedRouted: ActivatedRoute,
    //sirve para navegar
    private router: Router
  ) {}

  ngOnInit(): void {
    //al iniciar extrae los parametros de nuestra ruta y modifica ela informacion en el pipe
    this.activatedRouted.params
      .pipe(
        delay(300),
        switchMap( ({ id }) => this.heroService.getHeroById(id) )
      )
      .subscribe( hero => {
        if ( !hero ) return this.router.navigate([ '/heroes/list' ]);
        this.hero = hero;
        return;
      });
  }

  goBack() {
    this.router.navigateByUrl('heroes/list')
  }
}
