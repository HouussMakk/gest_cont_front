import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { HeaderComponent } from './components/layout/header/header.component';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,       // ✅ Nécessaire pour router-outlet
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication status
    this.authService.isAuthentificated.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    // Check if user is already logged in on app start
    if (this.authService.isLoggedIn()) {
      this.authService.setAuthentificated(true, this.authService.getToken() || '');
    }
  }
}
