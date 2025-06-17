import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StadeLitigeService } from '../../../services/stade-litige.service';
import { StadeLitige } from '../../../models/stade-litige.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stade-litige-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stade-litige-form.component.html',
  styleUrls: ['./stade-litige-form.component.scss']
})
export class StadeLitigeFormComponent implements OnInit {
  stadeLitigeForm: FormGroup;
  isEditMode = false;
  stadeLitigeId: number | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private stadeLitigeService: StadeLitigeService
  ) {
    this.stadeLitigeForm = this.fb.group({
      stedelitige: ['', [Validators.required, Validators.minLength(2)]],
      datChangementStatut: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== 'new') {
        this.isEditMode = true;
        this.stadeLitigeId = +id;
        this.loadStadeLitigeData(this.stadeLitigeId);
      } else {
        // Pour un nouveau stade, définir la date actuelle par défaut
        const today = new Date().toISOString().split('T')[0];
        this.stadeLitigeForm.patchValue({
          datChangementStatut: today
        });
      }
    });
  }

  loadStadeLitigeData(id: number): void {
    this.loading = true;
    this.stadeLitigeService.getStadeLitigeById(id).subscribe({
      next: (stadeLitige: StadeLitige) => {
        const dateValue = new Date(stadeLitige.datChangementStatut).toISOString().split('T')[0];
        this.stadeLitigeForm.patchValue({
          stedelitige: stadeLitige.stedelitige,
          datChangementStatut: dateValue
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du stade litige:', error);
        this.loading = false;
        alert('Erreur lors du chargement du stade litige');
        this.router.navigate(['/stades-litige']);
      }
    });
  }

  onSubmit(): void {
    if (this.stadeLitigeForm.invalid) {
      Object.keys(this.stadeLitigeForm.controls).forEach(key => {
        const control = this.stadeLitigeForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const formValue = this.stadeLitigeForm.value;
    const stadeLitigeData: StadeLitige = {
      idstadelitige: this.stadeLitigeId || 0,
      stedelitige: formValue.stedelitige,
      datChangementStatut: new Date(formValue.datChangementStatut)
    };

    if (this.isEditMode && this.stadeLitigeId) {
      this.stadeLitigeService.updateStadeLitige(this.stadeLitigeId, stadeLitigeData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/stades-litige']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.submitting = false;
          alert('Erreur lors de la mise à jour du stade litige');
        }
      });
    } else {
      this.stadeLitigeService.createStadeLitige(stadeLitigeData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/stades-litige']);
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          this.submitting = false;
          alert('Erreur lors de la création du stade litige');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/stades-litige']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.stadeLitigeForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.stadeLitigeForm.get(fieldName);
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
      stedelitige: 'Le stade litige',
      datChangementStatut: 'La date de changement de statut'
    };
    return displayNames[fieldName] || fieldName;
  }
}
