// File path: src/app/components/sleep-detector/add-sleep-detector/add-sleep-detector.component.ts

import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
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
export class AddSleepDetectorComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  addSleepDetectorForm: FormGroup;
  modelOptions: SleepDetectorModel[] = [];
  isLoadingModels = true; 

  constructor(
    private fb: FormBuilder,
    @Inject(SleepDetectorService) private sleepDetectorService: SleepDetectorService
  ) {
    this.addSleepDetectorForm = this.fb.group({
      name: ['', [Validators.required]],
      model: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadModelOptions(); // Fetch models on component initialization
  }

  // Method to load model options from the API
  loadModelOptions(): void {
    this.sleepDetectorService.getSleepDetectorsModels().subscribe({
      next: (models) => {
        this.modelOptions = models;
        this.isLoadingModels = false; // Models loaded successfully
      },
      error: (err) => {
        console.error('Error loading models:', err);
        alert('Failed to load models. Please try again.');
        this.isLoadingModels = false;
      }
    });
  }

  onSubmit(): void {
    if (this.addSleepDetectorForm.valid) {
      const formValues = this.addSleepDetectorForm.value;
      const selectedModel = this.modelOptions.find(model => model.id === formValues.model);

      if (selectedModel) {
        const sleepDetectorData: SleepDetectorRequest = {
          name: formValues.name,
          model: selectedModel
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