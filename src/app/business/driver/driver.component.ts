import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { PaginationService } from '../../services/pagination.service';
import { DriverResponse } from '../../models/driver.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddDriverComponent } from "./add-driver/add-driver.component";
import { DetailDriverComponent } from './detail-driver/detail-driver.component';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AddDriverComponent, DetailDriverComponent],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit {
  drivers: DriverResponse[] = [];
  paginatedDrivers: DriverResponse[] = [];
  showAddDriverModal = false;

  constructor(
    private driverService: DriverService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.updatePaginatedDrivers();
      },
      error: (err) => console.error('Error loading drivers:', err)
    });
  }

  updatePaginatedDrivers(): void {
    this.paginatedDrivers = this.paginationService.getPaginatedItems(this.drivers);
  }

  openAddDriverModal(): void {
    this.showAddDriverModal = true;
  }

  closeAddDriverModal(): void {
    this.showAddDriverModal = false;
    this.loadDrivers();
  }

  nextPage(): void {
    this.paginationService.nextPage();
    this.updatePaginatedDrivers();
  }

  previousPage(): void {
    this.paginationService.previousPage();
    this.updatePaginatedDrivers();
  }

  getCurrentPage(): number {
    return this.paginationService.getCurrentPage();
  }

  getTotalPages(): number {
    return this.paginationService.getTotalPages(this.drivers);
  }
}