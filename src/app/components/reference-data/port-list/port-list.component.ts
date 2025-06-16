import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortService } from '../../../services/port.service';
import { Port } from '../../../models/port.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-port-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './port-list.component.html',
  styleUrls: ['./port-list.component.scss']
})
export class PortListComponent implements OnInit {
  ports: Port[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private portService: PortService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPorts();
  }

  loadPorts(): void {
    this.loading = true;
    this.error = null;

    this.portService.getAllPorts().subscribe({
      next: (data) => {
        this.ports = data || [];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des ports';
        this.loading = false;
        console.error(error);
      }
    });
  }

  deletePort(code: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce port?')) {
      this.portService.deletePort(code).subscribe({
        next: () => {
          this.ports = this.ports.filter(p => p.codePort !== code);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression du port');
        }
      });
    }
  }

  navigateToNew(): void {
    this.router.navigate(['/ports/new']);
  }

  navigateToEdit(code: string): void {
    this.router.navigate(['/ports/edit', code]);
  }

  navigateToDetail(code: string): void {
    this.router.navigate(['/ports', code]);
  }
}
