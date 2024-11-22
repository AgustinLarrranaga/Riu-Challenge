import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent {

  cards = [
    { image: 'https://via.placeholder.com/300x200', text: 'Card 1' },
    { image: 'https://via.placeholder.com/300x200', text: 'Card 2' },
    { image: 'https://via.placeholder.com/300x200', text: 'Card 3' },
  ];
}
