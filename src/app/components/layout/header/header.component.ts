import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent {
  pageTitle = 'Dashboard';

  constructor(private router: Router) {
    this.updatePageTitle();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
    });
  }

  private updatePageTitle(): void {
    const url = this.router.url;

    if (url.includes('/dossiers')) {
      this.pageTitle = 'Dossiers Juridiques';
    } else if (url.includes('/mesures')) {
      this.pageTitle = 'Mesures Tribunal';
    } else if (url.includes('/documents')) {
      this.pageTitle = 'Documents';
    } else if (url.includes('/reference-data')) {
      this.pageTitle = 'Données de référence';
    } else {
      this.pageTitle = 'Dashboard';
    }
  }
}
