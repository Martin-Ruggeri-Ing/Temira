import { Component, OnInit } from '@angular/core';
import { SleepDetectorService } from '../../services/sleep-detector.service';
import { PaginationService } from '../../services/pagination.service';
import { SleepDetectorResponse } from '../../models/sleep-detector.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddSleepDetectorComponent } from "./add-sleep-detector/add-sleep-detector.component";
import { DetailSleepDetectorComponent } from './detail-sleep-detector/detail-sleep-detector.component';

@Component({
  selector: 'app-sleep-detector',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AddSleepDetectorComponent, DetailSleepDetectorComponent],
  templateUrl: './sleep-detector.component.html',
  styleUrl: './sleep-detector.component.css'
})
export class SleepDetectorComponent implements OnInit {
  sleepDetectors: SleepDetectorResponse[] = [];
  paginatedSleepDetectors: SleepDetectorResponse[] = [];
  showAddSleepDetectorModal = false;

  constructor(
    private sleepDetectorService: SleepDetectorService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.loadSleepDetectors();
  }

  loadSleepDetectors(): void {
    this.sleepDetectorService.getSleepDetectors().subscribe({
      next: (data) => {
        this.sleepDetectors = data;
        this.updatePaginatedSleepDetectors();
      },
      error: (err) => console.error('Error loading sleep detectors:', err)
    });
  }

  updatePaginatedSleepDetectors(): void {
    this.paginatedSleepDetectors = this.paginationService.getPaginatedItems(this.sleepDetectors);
  }

  openAddSleepDetectorModal(): void {
    this.showAddSleepDetectorModal = true;
  }

  closeAddSleepDetectorModal(): void {
    this.showAddSleepDetectorModal = false;
    this.loadSleepDetectors();
  }

  nextPage(): void {
    this.paginationService.nextPage();
    this.updatePaginatedSleepDetectors();
  }

  previousPage(): void {
    this.paginationService.previousPage();
    this.updatePaginatedSleepDetectors();
  }

  getCurrentPage(): number {
    return this.paginationService.getCurrentPage();
  }

  getTotalPages(): number {
    return this.paginationService.getTotalPages(this.sleepDetectors);
  }
}