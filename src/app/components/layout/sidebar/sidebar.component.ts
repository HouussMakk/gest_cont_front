import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  submenu?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: 'bi bi-house', route: '/dashboard' },
    { title: 'Dossier Juridique', icon: 'bi bi-file-earmark-fill', route: '/dossiers' },
    { title: 'Mesure Tribunal', icon: 'bi bi-archive-fill', route: '/mesures' },
    { title: 'Documents', icon: 'bi bi-file-arrow-up-fill', route: '/documents' },
    {
      title: 'Données de Référence',
      icon: 'bi bi-folder',
      route: '#',
      expanded: false,
      submenu: [
        { title: 'Avocats', icon: 'bi bi-scale', route: '/avocats' },
        { title: 'Ports', icon: 'bi bi-geo-alt', route: '/ports' },
        { title: 'Parties Adverses', icon: 'bi bi-people', route: '/parties-adverses' },
        { title: 'Stades Litige', icon: 'bi bi-graph-up', route: '/stades-litige' }
      ]
    }
  ];

  toggleSubmenu(item: MenuItem): void {
    if (item.submenu) {
      item.expanded = !item.expanded;
    }
  }

  hasSubmenu(item: MenuItem): boolean {
     return !!(item.submenu && item.submenu.length > 0);
  }
}
