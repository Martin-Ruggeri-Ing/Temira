import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
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
  showAddVehicleModal = false; // Controls the visibility of the modal

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles(); // Loads the list of sleep detectors on initialization
  }

  // Load the list of sleep detectors from the service
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => this.vehicles = data,
      error: (err) => console.error('Error loading sleep detectors:', err)
    });
  }

  // Open the modal to add a new sleep detector
  openAddVehicleModal(): void {
    this.showAddVehicleModal = true;
  }

  // Close the modal and reload the list of sleep detectors
  closeAddVehicleModal(): void {
    this.showAddVehicleModal = false;
    this.loadVehicles(); // Reload the list after adding a sleep detector
  }
}