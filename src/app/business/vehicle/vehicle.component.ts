import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { PaginationService } from '../../services/pagination.service';
import { VehicleResponse } from '../../models/vehicle.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddVehicleComponent } from "./add-vehicle/add-vehicle.component";
import { DetailVehicleComponent } from './detail-vehicle/detail-vehicle.component';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AddVehicleComponent, DetailVehicleComponent],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent implements OnInit {
  vehicles: VehicleResponse[] = [];
  paginatedVehicles: VehicleResponse[] = [];
  showAddVehicleModal = false;

  constructor(
    private vehicleService: VehicleService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.updatePaginatedVehicles();
      },
      error: (err) => console.error('Error loading vehicles:', err)
    });
  }

  updatePaginatedVehicles(): void {
    this.paginatedVehicles = this.paginationService.getPaginatedItems(this.vehicles);
  }

  openAddVehicleModal(): void {
    this.showAddVehicleModal = true;
  }

  closeAddVehicleModal(): void {
    this.showAddVehicleModal = false;
    this.loadVehicles();
  }

  nextPage(): void {
    this.paginationService.nextPage();
    this.updatePaginatedVehicles();
  }

  previousPage(): void {
    this.paginationService.previousPage();
    this.updatePaginatedVehicles();
  }

  getCurrentPage(): number {
    return this.paginationService.getCurrentPage();
  }

  getTotalPages(): number {
    return this.paginationService.getTotalPages(this.vehicles);
  }
}