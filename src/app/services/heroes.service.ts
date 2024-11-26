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

  saveHeroes(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.heroes))
  }

  getNewId(): number {
    if (this.heroes.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.heroes.map(hero => hero.id));
    return maxId + 1;
  }

   async loadHeroes(): Promise<void> {
      const storedHeroes = localStorage.getItem(this.localStorageKey);  
      if (storedHeroes == null) {
        await this.setAllHeroes();
      } else {
        this.heroes = JSON.parse(storedHeroes);
      }
    }

    setAllHeroes(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.http.get<any>(this.heroesUrl).subscribe({
          next: (data) => {
            this.heroes = data.heroes;
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.heroes));
            resolve();
          },
          error: (error) => {
            console.error('Error loading heroes:', error);
            reject(error);
          },
        });
      });
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

  getHeroById(id: number): Hero | null {
    const hero = this.heroes.find(hero => hero.id == id)
    if (!hero) {
      return null
    }
    return hero
  }

  addHero(hero: Hero): void {
    hero.id = this.getNewId()
    this.heroes.push(hero)
    this.saveHeroes()
  }

  updateHero(updatedHero: Hero): void {
    let hero = this.heroes.find(h => h.id == updatedHero.id);    
    if (hero) {
      hero.name = updatedHero.name;
      hero.world = updatedHero.world;
      hero.image = updatedHero.image;
      hero.enemy = updatedHero.enemy;
      hero.author = updatedHero.author;
      this.saveHeroes(); 
    } else {
      console.error(`Heroe con id ${updatedHero.id} no encontrado.`);
    }
  }


  deleteHero(id: number): Hero[] {
    this.heroes = this.heroes.filter(hero => hero.id !== id)
    this.saveHeroes()
    return this.heroes
  }

  searchHeroesByName(query: string): Hero[] {
    return this.heroes.filter(hero => hero.name.toLowerCase().includes(query.toLowerCase()))
  }



}
