import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartieAdverseService } from '../../../services/partie-adverse.service';
import { PartieAdverse } from '../../../models/partie-adverse.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partie-adverse-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './partie-adverse-form.component.html',
  styleUrls: ['./partie-adverse-form.component.scss']
})
export class PartieAdverseFormComponent implements OnInit {
  partieAdverseForm: FormGroup;
  isEditMode = false;
  partieAdverseId: number | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private partieAdverseService: PartieAdverseService
  ) {
    this.partieAdverseForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      adresee: ['', [Validators.required, Validators.minLength(5)]],
      contact: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== 'new') {
        this.isEditMode = true;
        this.partieAdverseId = +id;
        this.loadPartieAdverseData(this.partieAdverseId);
      }
    });
  }

  loadPartieAdverseData(id: number): void {
    this.loading = true;
    this.partieAdverseService.getPartieAdverseById(id).subscribe({
      next: (partieAdverse: PartieAdverse) => {
        this.partieAdverseForm.patchValue({
          nom: partieAdverse.nom,
          adresee: partieAdverse.adresee,
          contact: partieAdverse.contact
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la partie adverse:', error);
        this.loading = false;
        alert('Erreur lors du chargement de la partie adverse');
        this.router.navigate(['/parties-adverses']);
      }
    });
  }

  onSubmit(): void {
    if (this.partieAdverseForm.invalid) {
      Object.keys(this.partieAdverseForm.controls).forEach(key => {
        const control = this.partieAdverseForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const partieAdverseData: PartieAdverse = {
      idPartieadverse: this.partieAdverseId || undefined,
      ...this.partieAdverseForm.value
    };

    if (this.isEditMode && this.partieAdverseId) {
      this.partieAdverseService.updatePartieAdverse(this.partieAdverseId, partieAdverseData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/parties-adverses']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.submitting = false;
          alert('Erreur lors de la mise à jour de la partie adverse');
        }
      });
    } else {
      this.partieAdverseService.createPartieAdverse(partieAdverseData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/parties-adverses']);
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          this.submitting = false;
          alert('Erreur lors de la création de la partie adverse');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/parties-adverses']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.partieAdverseForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.partieAdverseForm.get(fieldName);
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
      nom: 'Le nom',
      adresee: 'L\'adresse',
      contact: 'Le contact'
    };
    return displayNames[fieldName] || fieldName;
  }
}
