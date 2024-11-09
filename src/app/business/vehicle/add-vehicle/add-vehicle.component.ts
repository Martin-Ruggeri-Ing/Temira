import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleRequest } from '../../../models/vehicle.model';
import { VehicleService } from '../../../services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent {
  @Output() closeModal = new EventEmitter<void>();
  addVehicleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(VehicleService) private vehicleService: VehicleService,
  ) {
    // Initialize form group with validation
    this.addVehicleForm = this.fb.group({
      type: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      registration: ['', [Validators.required]],
      model: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  // Submit handler for the form
  onSubmit() {
    if (this.addVehicleForm.valid) {
      const vehicleData: VehicleRequest = this.addVehicleForm.value;
      this.vehicleService.createVehicle(vehicleData).subscribe({
        next: () => {
          this.closeModal.emit();
        },
        error: (err) => {
          console.error('Error creating vehicle:', err);
          alert('Failed to create vehicle. Please try again.');
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
