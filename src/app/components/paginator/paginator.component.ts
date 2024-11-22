/* 
nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadCharacters(this.currentPage + 1)
    }
    this.filteredPages = [this.currentPage - 1, this.currentPage, this.currentPage + 1]
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadCharacters(this.currentPage - 1)
    }
    this.filteredPages = [this.currentPage - 1, this.currentPage, this.currentPage + 1 ]
  }

  goToPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      this.loadCharacters(pageNumber)
    }
    if (pageNumber > 0 && pageNumber <= this.totalPages){
      this.filteredPages = [pageNumber - 1, pageNumber, pageNumber + 1]
    }
    } */