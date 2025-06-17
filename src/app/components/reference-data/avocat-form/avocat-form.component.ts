import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvocatService } from '../../../services/avocat.service';
import { Avocat } from '../../../models/avocat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avocat-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './avocat-form.component.html',
  styleUrls: ['./avocat-form.component.scss']
})
export class AvocatFormComponent implements OnInit {
  avocatForm: FormGroup;
  isEditMode = false;
  avocatId: number | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private avocatService: AvocatService
  ) {
    this.avocatForm = this.fb.group({
      nomCabinet: ['', [Validators.required, Validators.minLength(2)]],
      contact: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== 'new') {
        this.isEditMode = true;
        this.avocatId = +id;
        this.loadAvocatData(this.avocatId);
      }
    });
  }

  loadAvocatData(id: number): void {
    this.loading = true;
    this.avocatService.getAvocatById(id).subscribe({
      next: (avocat: Avocat) => {
        this.avocatForm.patchValue({
          nomCabinet: avocat.nomCabinet,
          contact: avocat.contact
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'avocat:', error);
        this.loading = false;
        alert('Erreur lors du chargement de l\'avocat');
        this.router.navigate(['/avocats']);
      }
    });
  }

  onSubmit(): void {
    if (this.avocatForm.invalid) {
      Object.keys(this.avocatForm.controls).forEach(key => {
        const control = this.avocatForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const avocatData: Avocat = {
      idAvocat: this.avocatId || 0,
      ...this.avocatForm.value
    };

    if (this.isEditMode && this.avocatId) {
      this.avocatService.updateAvocat(this.avocatId, avocatData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/avocats']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.submitting = false;
          alert('Erreur lors de la mise à jour de l\'avocat');
        }
      });
    } else {
      this.avocatService.createAvocat(avocatData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/avocats']);
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          this.submitting = false;
          alert('Erreur lors de la création de l\'avocat');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/avocats']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.avocatForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.avocatForm.get(fieldName);
    if (field?.errors?.['required']) {
      return `${this.getFieldDisplayName(fieldName)} est requis`;
    }
    if (field?.errors?.['minlength']) {
      return `${this.getFieldDisplayName(fieldName)} doit contenir au moins ${field.errors['minlength'].requiredLength} caractères`;
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      nomCabinet: 'Le nom du cabinet',
      contact: 'Le contact'
    };
    return displayNames[fieldName] || fieldName;
  }
}
