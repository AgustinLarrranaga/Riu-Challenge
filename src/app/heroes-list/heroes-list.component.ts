import { Component } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { Hero } from '../models/hero.model';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent {

 heroes: Hero[] = []
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.loadCharacters()
  }

  loadCharacters(page: number = 1): void {
    this.heroes = this.heroesService.getAllHeroes()
  }
}
