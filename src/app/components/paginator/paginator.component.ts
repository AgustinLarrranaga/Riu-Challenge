import { Component, EventEmitter, Output } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {

  currentPage: number = 1;
  totalPages: number = 3
  filteredPages: number[] = [1, 2, 3]


  constructor(private heroesService: HeroesService) { }

  @Output() pageChanged = new EventEmitter<number>(); 


  nextPage(): void {
    if (this.currentPage < this.totalPages) {

      this.currentPage += 1
      this.pageChanged.emit(this.currentPage);

      this.filteredPages = [this.currentPage - 1, this.currentPage, this.currentPage + 1]
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1
      this.pageChanged.emit(this.currentPage);
      this.filteredPages = [this.currentPage - 1, this.currentPage, this.currentPage + 1]
    }
  }


}