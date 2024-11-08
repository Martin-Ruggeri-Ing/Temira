import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { DriverResponse } from '../../models/driver.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddDriverComponent } from "./add-driver/add-driver.component";

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AddDriverComponent],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit {
  drivers: DriverResponse[] = [];
  showAddDriverModal = false; // Controla la visibilidad del modal

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers(); // Carga la lista de conductores al iniciar
  }

  // Cargar la lista de conductores desde el servicio
  loadDrivers(): void {
    this.driverService.getDrivers().subscribe({
      next: (data) => this.drivers = data,
      error: (err) => console.error('Error loading drivers:', err)
    });
  }

  // Abre el modal para agregar un nuevo conductor
  openAddDriverModal(): void {
    this.showAddDriverModal = true;
  }

  // Cierra el modal y recarga la lista de conductores
  closeAddDriverModal(): void {
    this.showAddDriverModal = false;
    this.loadDrivers(); // Recarga la lista después de agregar un conductor
  }
}
