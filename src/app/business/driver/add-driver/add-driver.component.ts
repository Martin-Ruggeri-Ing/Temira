import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DriverService } from '../../../services/driver.service';
import { DriverRequest } from '../../../models/driver.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddDriverComponent {
  @Output() closeModal = new EventEmitter<void>();
  addDriverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(DriverService) private driverService: DriverService,
  ) {
    // Initialize form group with validation
    this.addDriverForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  // Submit handler for the form
  onSubmit() {
    if (this.addDriverForm.valid) {
      const driverData: DriverRequest = this.addDriverForm.value;
      this.driverService.createDriver(driverData).subscribe({
        next: () => {
          alert('Driver created successfully!');
          this.closeModal.emit();
        },
        error: (err) => {
          console.error('Error creating driver:', err);
          alert('Failed to create driver. Please try again.');
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}