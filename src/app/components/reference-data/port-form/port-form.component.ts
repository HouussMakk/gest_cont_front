import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PortService } from '../../../services/port.service';
import { Port } from '../../../models/port.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-port-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './port-form.component.html',
  styleUrls: ['./port-form.component.scss']
})
export class PortFormComponent implements OnInit {
  portForm: FormGroup;
  isEditMode = false;
  portCode: string | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private portService: PortService
  ) {
    this.portForm = this.fb.group({
      codePort: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      nomPort: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const code = params.get('code');
      if (code && code !== 'new') {
        this.isEditMode = true;
        this.portCode = code;
        this.loadPortData(this.portCode);
        // En mode édition, désactiver le champ codePort
        this.portForm.get('codePort')?.disable();
      }
    });
  }

  loadPortData(code: string): void {
    this.loading = true;
    this.portService.getPortByCode(code).subscribe({
      next: (port: Port) => {
        this.portForm.patchValue({
          codePort: port.codePort,
          nomPort: port.nomPort
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du port:', error);
        this.loading = false;
        alert('Erreur lors du chargement du port');
        this.router.navigate(['/ports']);
      }
    });
  }

  onSubmit(): void {
    if (this.portForm.invalid) {
      Object.keys(this.portForm.controls).forEach(key => {
        const control = this.portForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const portData: Port = {
      codePort: this.isEditMode ? this.portCode! : this.portForm.get('codePort')?.value,
      nomPort: this.portForm.get('nomPort')?.value
    };

    if (this.isEditMode && this.portCode) {
      this.portService.updatePort(this.portCode, portData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/ports']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.submitting = false;
          alert('Erreur lors de la mise à jour du port');
        }
      });
    } else {
      this.portService.createPort(portData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/ports']);
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          this.submitting = false;
          alert('Erreur lors de la création du port');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/ports']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.portForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.portForm.get(fieldName);
    if (field?.errors?.['required']) {
      return `${this.getFieldDisplayName(fieldName)} est requis`;
    }
    if (field?.errors?.['minlength']) {
      return `${this.getFieldDisplayName(fieldName)} doit contenir au moins ${field.errors['minlength'].requiredLength} caractères`;
    }
    if (field?.errors?.['maxlength']) {
      return `${this.getFieldDisplayName(fieldName)} ne peut pas dépasser ${field.errors['maxlength'].requiredLength} caractères`;
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      codePort: 'Le code du port',
      nomPort: 'Le nom du port'
    };
    return displayNames[fieldName] || fieldName;
  }
}
