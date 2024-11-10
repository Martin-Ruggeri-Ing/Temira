import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../services/vehicle.service';
import { VehicleRequest, VehicleBrand, VehicleType } from '../../../models/vehicle.model';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddVehicleComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  addVehicleForm: FormGroup;
  brandOptions: VehicleBrand[] = []; // Lista de marcas
  typeOptions: VehicleType[] = [];   // Lista de tipos
  isLoadingBrands = true;            // Indicador de carga para marcas
  isLoadingTypes = true;             // Indicador de carga para tipos

  constructor(
    private fb: FormBuilder,
    @Inject(VehicleService) private vehicleService: VehicleService
  ) {
    this.addVehicleForm = this.fb.group({
      registration: ['', [Validators.required]],
      model: [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1900), Validators.max(2100)]],
      brand: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadBrandOptions();
    this.loadTypeOptions();
  }

  // Método para cargar las marcas desde el servicio
  loadBrandOptions(): void {
    this.vehicleService.getVehicleBrands().subscribe({
      next: (brands) => {
        this.brandOptions = brands;
        this.isLoadingBrands = false;
      },
      error: (err) => {
        console.error('Error loading vehicle brands:', err);
        alert('Failed to load vehicle brands. Please try again.');
        this.isLoadingBrands = false;
      }
    });
  }

  // Método para cargar los tipos desde el servicio
  loadTypeOptions(): void {
    this.vehicleService.getVehicleTypes().subscribe({
      next: (types) => {
        this.typeOptions = types;
        this.isLoadingTypes = false;
      },
      error: (err) => {
        console.error('Error loading vehicle types:', err);
        alert('Failed to load vehicle types. Please try again.');
        this.isLoadingTypes = false;
      }
    });
  }

  // Manejador de envío del formulario
  onSubmit(): void {
    if (this.addVehicleForm.valid) {
      const formValues = this.addVehicleForm.value;
      const selectedBrand = this.brandOptions.find(brand => brand.id === formValues.brand);
      const selectedType = this.typeOptions.find(type => type.id === formValues.type);

      if (selectedBrand && selectedType) {
        const vehicleData: VehicleRequest = {
          registration: formValues.registration,
          model: formValues.model,
          brand: selectedBrand,
          type: selectedType
        };

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
        alert('Selected brand or type not found.');
      }
    } else {
      alert('Please fill out all required fields.');
    }
  }
}