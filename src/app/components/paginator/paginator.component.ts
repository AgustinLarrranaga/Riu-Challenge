import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {

  currentPage: number = 1
  @Input() totalPages: number = 1
  @Input() disable : boolean = false

  constructor(private heroesService: HeroesService) { }

  @Output() pageChanged = new EventEmitter<number>(); 



  nextPage(): void {
    if (this.currentPage < this.totalPages && !this.disable) {
      this.currentPage += 1
      this.pageChanged.emit(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1 && !this.disable) {
      this.currentPage -= 1
      this.pageChanged.emit(this.currentPage);
    }
  }


}