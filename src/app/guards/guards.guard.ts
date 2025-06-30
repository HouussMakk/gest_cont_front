import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    console.log('AuthGuard: canActivate called'); // Debug log
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('AuthGuard: isLoggedIn =', isLoggedIn); // Debug log

    if (isLoggedIn) {
      return true;
    } else {
      console.log('AuthGuard: Redirecting to login'); // Debug log
      this.router.navigate(['/login']);
      return false;
    }
  }
}
