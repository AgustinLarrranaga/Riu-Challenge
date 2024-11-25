import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Hero } from '../models/hero.model'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroesUrl = 'assets/heroes.json'
  private localStorageKey = 'heroes'
  private heroes: Hero[] = []

  constructor(private http: HttpClient) {
    this.loadHeroes()
  }

  private loadHeroes(): void {
    const storedHeroes = localStorage.getItem(this.localStorageKey);
    if (storedHeroes == null) {
      this.setAllHeroes();
    } else {
      this.heroes = storedHeroes ? JSON.parse(storedHeroes) : [];
    }
  }


  private setAllHeroes() {
    this.http.get<any>(this.heroesUrl).subscribe((data) => {
      this.heroes = data.heroes
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.heroes))
    })
  }

  private saveHeroes(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.heroes))
  }

  private getNewId(): number {
    if (this.heroes.length === 0) {
      return 1; 
    }
    const maxId = Math.max(...this.heroes.map(hero => hero.id));
    return maxId + 1;
  }
  

  getTotalPages(): number {
    const heroesPerPage = 12;
    const totalHeroes = this.heroes.length;

    return Math.ceil(totalHeroes / heroesPerPage);
  }

  getHeroesByPage(page: number): Hero[] {
    const pageSize = 12;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.heroes.slice(startIndex, endIndex);
  }


  getAllHeroes(): Hero[] {
    return this.heroes
  }

  getHeroById(id: number): Hero | undefined {
    return this.heroes.find(hero => hero.id === id)
  }

  addHero(hero: Hero): void {
    hero.id = this.getNewId() + 1
    this.heroes.push(hero)
    this.saveHeroes()
  }

  updateHero(id: number, updatedHero: Hero): void {
    const index = this.heroes.findIndex(hero => hero.id === id)
    if (index !== -1) {
      this.heroes[index] = { ...this.heroes[index], ...updatedHero }
    }
    this.saveHeroes()

  }

  deleteHero(id: number): Hero[] {
    console.log('borrandio');

    this.heroes = this.heroes.filter(hero => hero.id !== id)
    this.saveHeroes()
    return this.heroes
  }

  searchHeroesByName(query: string): Hero[] {
    return this.heroes.filter(hero => hero.name.toLowerCase().includes(query.toLowerCase()))
  }



}
