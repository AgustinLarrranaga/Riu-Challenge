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
  loading : boolean = true

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.loadHeroes().then(() => {
      this.heroes = this.heroesService.getHeroesByPage(1);
      this.loading = false
    });
  }

  onPageChanged(page: number) {
    this.heroes = this.heroesService.getHeroesByPage(page)
  }

  onSearch(searchValue: string) {
    if (searchValue) {
      this.heroes = this.heroesService.searchHeroesByName(searchValue)
      this.paginatorDisable = true
    } else {
      this.heroes = this.heroesService.getHeroesByPage(1);
    }
  }

  onDeleteHero(id: number) {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar a este héroe?');
    if (confirmDelete) {
      this.heroes = this.heroesService.deleteHero(id)
    }
  }
}
