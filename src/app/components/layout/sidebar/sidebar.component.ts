import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent {
  menuItems = [
    { title: 'Dashboard', icon: 'bi bi-house', route: '/dashboard' },
    { title: 'Dossier Juridique', icon: 'bi bi-file-earmark-fill', route: '/dossiers' },
    { title: 'Mesure Tribunal', icon: 'bi bi-archive-fill', route: '/mesures' },
    { title: 'Documents', icon: 'bi bi-file-arrow-up-fill', route: '/documents' },
    { title: 'Données de référence', icon: 'bi bi-file-earmark-fill', route: '/reference-data' }
  ];
}
