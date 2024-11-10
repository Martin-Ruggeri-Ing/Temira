import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private currentPage = 0;
  private itemsPerPage = 12; // 3x4 grid

  // Calculate the paginated items
  getPaginatedItems<T>(items: T[]): T[] {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return items.slice(start, end);
  }

  // Getters and setters for pagination
  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  getTotalPages(items: any[]): number {
    return Math.ceil(items.length / this.itemsPerPage);
  }

  nextPage(): void {
    this.currentPage++;
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}