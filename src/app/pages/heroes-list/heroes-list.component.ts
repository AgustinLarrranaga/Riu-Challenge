import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent {

  heroes: Hero[] = []
  paginatorDisable: boolean = false
  
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.loadCharacters()
  }

  loadCharacters(page: number = 1): void {
    this.heroes = this.heroesService.getHeroesByPage(page)
    console.log(this.heroes)
  }

  onPageChanged(page: number) {
    this.heroes = this.heroesService.getHeroesByPage(page)
    console.log(this.heroes)
  }

  onSearch(searchValue: string) {
    if (searchValue) {
      this.heroes = this.heroesService.searchHeroesByName(searchValue)
      this.paginatorDisable = true
    } else {
      window.location.reload()
    }
  }


}
