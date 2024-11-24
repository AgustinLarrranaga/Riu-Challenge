import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-add-hero-button',
  templateUrl: './add-hero-button.component.html',
  styleUrls: ['./add-hero-button.component.css']
})
export class AddHeroButtonComponent   {


  constructor(private heroesService: HeroesService) { }

  addHero(){
    
  }

}