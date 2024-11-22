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
  

  getHeroesByPage(page: number): Hero[] {
    const pageSize = 12;  
    const startIndex = (page - 1) * pageSize;  
    const endIndex = startIndex + pageSize;  
    return this.heroes.slice(startIndex, endIndex);
  }
  

  private setAllHeroes(){
    this.http.get<any>(this.heroesUrl).subscribe( (data) => {
        this.heroes = data.heroes 
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.heroes)) 
      })
    }

  private saveHeroes(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.heroes))
  }

  getAllHeroes(): Hero[] {
    return this.heroes
  }

  getHeroById(id: string): Hero | undefined {
    return this.heroes.find(hero => hero.id === id)
  }

  addHero(hero: Hero): void {
    this.heroes.push(hero)
    this.saveHeroes()
  }

  updateHero(id: string, updatedHero: Hero): void {
    const index = this.heroes.findIndex(hero => hero.id === id)
    if (index !== -1) {
      this.heroes[index] = { ...this.heroes[index], ...updatedHero } 
    }
    this.saveHeroes()

  }

  deleteHero(id: string): void {
    this.heroes = this.heroes.filter(hero => hero.id !== id)
    this.saveHeroes()
  }

  searchHeroesByName(query: string): Hero[] {
    return this.heroes.filter(hero => hero.name.toLowerCase().includes(query.toLowerCase()))
  }


  
}
