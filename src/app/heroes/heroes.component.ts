import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:Hero[];
  // selectedHero:Hero;
  // onSelect(hero:Hero){
  //   this.selectedHero = hero;
  // }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }


  save(name:string):void{
    name=name.trim();
    if(!name){
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe(hero=>this.heroes.push(hero));
  }
}
