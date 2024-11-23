import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchForm: FormGroup
  @Output() search = new EventEmitter<any>()


  
  constructor (
    private heroesService: HeroesService,
    private fb: FormBuilder
  ){
    this.searchForm = this.fb.group({
      searcher: ['']
    })
  }

  searchHeroesByName() {
     const searchValue = this.searchForm.get('searcher')?.value 
     this.search.emit(searchValue);
  } 
}