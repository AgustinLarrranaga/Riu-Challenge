import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  characterSearched?: []
  searchForm: FormGroup
  @Output() emitCharacterSearched = new EventEmitter<any>()
  infoMessage?: string
  @Output() emitInfoMessage = new EventEmitter<any>()

  
  constructor (
    private heroesService: HeroesService,
    private fb: FormBuilder
  ){
    this.searchForm = this.fb.group({
      searcher: ['']
    })
  }

  searchCharactersByName() {
     const searchValue = this.searchForm.get('searcher')?.value 
     console.log(searchValue);

    if (searchValue) {
      console.log(searchValue);
      this.heroesService.searchHeroesByName(searchValue)
      
    } else {
      window.location.reload()
    } 
  } 
}