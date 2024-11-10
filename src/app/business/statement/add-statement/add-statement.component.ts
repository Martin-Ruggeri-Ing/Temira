import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatementService } from '../../../services/statement.service';
import { DriverService } from '../../../services/driver.service';
import { VehicleService } from '../../../services/vehicle.service';
import { SleepDetectorService } from '../../../services/sleep-detector.service';
import { StatementRequest } from '../../../models/statement.model';
import { DriverResponse } from '../../../models/driver.model'; // Assuming there's a Driver model
import { VehicleResponse } from '../../../models/vehicle.model'; // VehicleResponse for registration
import { SleepDetectorResponse } from '../../../models/sleep-detector.model'; // SleepDetectorResponse for name

@Component({
  selector: 'app-add-statement',
  templateUrl: './add-statement.component.html',
  styleUrls: ['./add-statement.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddStatementComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  addStatementForm: FormGroup;
  driverOptions: DriverResponse[] = [];
  vehicleOptions: VehicleResponse[] = [];
  sleepDetectorOptions: SleepDetectorResponse[] = [];
  csvFile: File | null = null;
  isLoadingDrivers = true;
  isLoadingVehicles = true;
  isLoadingSleepDetectors = true;

  constructor(
    private fb: FormBuilder,
    @Inject(StatementService) private statementService: StatementService,
    @Inject(DriverService) private driverService: DriverService,
    @Inject(VehicleService) private vehicleService: VehicleService,
    @Inject(SleepDetectorService) private sleepDetectorService: SleepDetectorService
  ) {
    this.addStatementForm = this.fb.group({
      sleepDetectorId: ['', [Validators.required]],
      driverId: ['', [Validators.required]],
      vehicleId: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      csvFile: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadDriverOptions();
    this.loadVehicleOptions();
    this.loadSleepDetectorOptions();
  }

  // Load driver options from API
  loadDriverOptions(): void {
    this.driverService.getDrivers().subscribe({
      next: (drivers) => {
        this.driverOptions = drivers;
        this.isLoadingDrivers = false;
      },
      error: (err) => {
        console.error('Error loading drivers:', err);
        alert('Failed to load drivers. Please try again.');
        this.isLoadingDrivers = false;
      }
    });
  }

  // Load vehicle options from API
  loadVehicleOptions(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicleOptions = vehicles;
        this.isLoadingVehicles = false;
      },
      error: (err) => {
        console.error('Error loading vehicles:', err);
        alert('Failed to load vehicles. Please try again.');
        this.isLoadingVehicles = false;
      }
    });
  }

  // Load sleep detector options from API
  loadSleepDetectorOptions(): void {
    this.sleepDetectorService.getSleepDetectors().subscribe({
      next: (sleepDetectors) => {
        this.sleepDetectorOptions = sleepDetectors;
        this.isLoadingSleepDetectors = false;
      },
      error: (err) => {
        console.error('Error loading sleep detectors:', err);
        alert('Failed to load sleep detectors. Please try again.');
        this.isLoadingSleepDetectors = false;
      }
    });
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.csvFile = fileInput.files[0];
    }
  }

  // Submit handler for the form
  onSubmit(): void {
    if (this.addStatementForm.valid && this.csvFile) {
      const formValues = this.addStatementForm.value;
      const statementData: StatementRequest = {
        sleepDetectorId: formValues.sleepDetectorId,
        driverId: formValues.driverId,
        vehicleId: formValues.vehicleId,
        destination: formValues.destination,
        csvFile: this.csvFile
      };

      // Using FormData to handle file upload
      const formData = new FormData();
      formData.append('sleepDetectorId', statementData.sleepDetectorId);
      formData.append('driverId', statementData.driverId);
      formData.append('vehicleId', statementData.vehicleId);
      formData.append('destination', statementData.destination);
      formData.append('csvFile', statementData.csvFile);

      this.statementService.createStatement(formData).subscribe({
        next: () => {
          this.closeModal.emit();
        },
        error: (err) => {
          console.error('Error creating statement:', err);
          alert('Failed to create statement. Please try again.');
        }
      });
    } else {
      alert('Please fill out all required fields and select a CSV file.');
    }
  }
}