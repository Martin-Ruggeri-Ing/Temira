import { Component, OnInit } from '@angular/core';
import { StatementService } from '../../services/statement.service';
import { PaginationService } from '../../services/pagination.service';
import { StatementResponse } from '../../models/statement.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddStatementComponent } from "./add-statement/add-statement.component";
import { DetailStatementComponent } from './detail-statement/detail-statement.component';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AddStatementComponent, DetailStatementComponent],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.css'
})
export class StatementComponent implements OnInit {
  statements: StatementResponse[] = [];
  paginatedStatements: StatementResponse[] = [];
  showAddStatementModal = false;

  constructor(
    private statementService: StatementService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.loadStatements();
  }

  loadStatements(): void {
    this.statementService.getStatements().subscribe({
      next: (data) => {
        this.statements = data;
        this.updatePaginatedStatements();
      },
      error: (err) => console.error('Error loading sleep detectors:', err)
    });
  }

  updatePaginatedStatements(): void {
    this.paginatedStatements = this.paginationService.getPaginatedItems(this.statements);
  }

  openAddStatementModal(): void {
    this.showAddStatementModal = true;
  }

  closeAddStatementModal(): void {
    this.showAddStatementModal = false;
    this.loadStatements();
  }

  nextPage(): void {
    this.paginationService.nextPage();
    this.updatePaginatedStatements();
  }

  previousPage(): void {
    this.paginationService.previousPage();
    this.updatePaginatedStatements();
  }

  getCurrentPage(): number {
    return this.paginationService.getCurrentPage();
  }

  getTotalPages(): number {
    return this.paginationService.getTotalPages(this.statements);
  }
}