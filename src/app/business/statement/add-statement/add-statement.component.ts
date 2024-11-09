import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatementService } from '../../../services/statement.service';
import { StatementRequest } from '../../../models/statement.model';

@Component({
  selector: 'app-add-statement',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-statement.component.html',
  styleUrls: ['./add-statement.component.css']
})
export class AddStatementComponent {
  @Output() closeModal = new EventEmitter<void>();
  addStatementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(StatementService) private statementService: StatementService,
  ) {
    // Initialize form group with validation
    this.addStatementForm = this.fb.group({
      sleepDetector: ['', [Validators.required]],
      driver: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      csvFile: [null, [Validators.required]]
    });
  }

  // Handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addStatementForm.patchValue({
        csvFile: file
      });
    }
  }

  // Submit handler for the form
  onSubmit() {
    if (this.addStatementForm.valid) {
      const statementRequest: StatementRequest = {
        sleepDetector: this.addStatementForm.get('sleepDetector')?.value,
        driver: this.addStatementForm.get('driver')?.value,
        vehicle: this.addStatementForm.get('vehicle')?.value,
        destination: this.addStatementForm.get('destination')?.value,
        csvFile: this.addStatementForm.get('csvFile')?.value
      };

      this.statementService.createStatement(statementRequest).subscribe({
        next: () => {
          this.closeModal.emit();
        },
        error: (err) => {
          console.error('Error creating statement:', err);
          alert('Failed to create statement. Please try again.');
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
