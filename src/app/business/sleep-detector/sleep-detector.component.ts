import { Component, OnInit } from '@angular/core';
import { SleepDetectorService } from '../../services/sleep-detector.service';
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
  showAddSleepDetectorModal = false; // Controls the visibility of the modal

  constructor(private sleepDetectorService: SleepDetectorService) {}

  ngOnInit(): void {
    this.loadSleepDetectors(); // Loads the list of sleep detectors on initialization
  }

  // Load the list of sleep detectors from the service
  loadSleepDetectors(): void {
    this.sleepDetectorService.getSleepDetectors().subscribe({
      next: (data) => this.sleepDetectors = data,
      error: (err) => console.error('Error loading sleep detectors:', err)
    });
  }

  // Open the modal to add a new sleep detector
  openAddSleepDetectorModal(): void {
    this.showAddSleepDetectorModal = true;
  }

  // Close the modal and reload the list of sleep detectors
  closeAddSleepDetectorModal(): void {
    this.showAddSleepDetectorModal = false;
    this.loadSleepDetectors(); // Reload the list after adding a sleep detector
  }
}