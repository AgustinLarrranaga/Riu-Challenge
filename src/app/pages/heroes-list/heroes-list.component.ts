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
  currentPage : number = 1

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.loadHeroes().then(() => {
      this.heroes = this.heroesService.getHeroesByPage(this.currentPage);
      this.loading = false
    });
  }

  onPageChanged(page: number) {
    this.currentPage = page
    this.heroes = this.heroesService.getHeroesByPage(this.currentPage)
  }

  onSearch(searchValue: string) {
    if (searchValue) {
      this.heroes = this.heroesService.searchHeroesByName(searchValue)
      this.paginatorDisable = true
    } else {
      this.heroes = this.heroesService.getHeroesByPage(1);
      this.paginatorDisable = false
    }
  }

  onDeleteHero(id: number) {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar a este héroe?');
    if (confirmDelete) {
      this.heroesService.deleteHero(id)
      this.heroes = this.heroesService.getHeroesByPage(this.currentPage)
    }
  }
}
