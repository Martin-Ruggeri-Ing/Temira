import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SleepDetectorService } from '../../../services/sleep-detector.service';
import { SleepDetectorRequest, SleepDetectorModel } from '../../../models/sleep-detector.model';

@Component({
  selector: 'app-add-sleep-detector',
  templateUrl: './add-sleep-detector.component.html',
  styleUrls: ['./add-sleep-detector.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddSleepDetectorComponent {
  @Output() closeModal = new EventEmitter<void>();
  addSleepDetectorForm: FormGroup;

  // Model options with their corresponding UUIDs
  modelOptions: SleepDetectorModel[] = [
    {
      id: 'd2d69b18-8e32-11ef-bba2-0242ac130002',
      name: 'Rspberry-Pi'
    },
    {
      id: 'p2d69b18-8e32-11ef-bba2-0242ac130002',
      name: 'Arduino'
    },
    // You can add more models here as needed
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(SleepDetectorService) private sleepDetectorService: SleepDetectorService
  ) {
    // Initialize form group with validation
    this.addSleepDetectorForm = this.fb.group({
      name: ['', [Validators.required]],
      model: ['', [Validators.required]]
    });
  }

  // Submit handler for the form
  onSubmit() {
    if (this.addSleepDetectorForm.valid) {
      const formValues = this.addSleepDetectorForm.value;
      
      // Find the selected model by its name
      const selectedModel = this.modelOptions.find(model => model.name === formValues.model);

      if (selectedModel) {
        const sleepDetectorData: SleepDetectorRequest = {
          name: formValues.name,
          model: selectedModel // Pass the whole model object
        };

        this.sleepDetectorService.createSleepDetector(sleepDetectorData).subscribe({
          next: () => {
            this.closeModal.emit();
          },
          error: (err) => {
            console.error('Error creating sleep detector:', err);
            alert('Failed to create sleep detector. Please try again.');
          }
        });
      } else {
        alert('Selected model not found.');
      }
    } else {
      alert('Please fill out all required fields.');
    }
  }
}