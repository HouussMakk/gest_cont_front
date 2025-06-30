import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/authModels';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginEndpoint = "http://localhost:8086/auth/login";
  private registerEndpoint = "http://localhost:8086/auth/signup";
  private _isAuthentificatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthentificated = this._isAuthentificatedSubject$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  public setAuthentificated(state: boolean, jwt: string) {
    console.log('AuthService: setAuthentificated called with state:', state, 'jwt:', jwt);
    this._isAuthentificatedSubject$.next(state);
    if (jwt) {
      window.localStorage.setItem("jwt", jwt);
    }
  }

  login(loginRequest: LoginRequest) {
    return this.httpClient.post<LoginResponse>(this.loginEndpoint, loginRequest);
  }

  register(registerRequest: RegisterRequest) {
    return this.httpClient.post(this.registerEndpoint, registerRequest);
  }

  isLoggedIn(): boolean {
    console.log('AuthService: isLoggedIn called');
    try {
      const token = localStorage.getItem('jwt');
      console.log('AuthService: token from localStorage:', token);

      if (!token) {
        console.log('AuthService: No token found');
        return false;
      }

      // For debugging, let's just check if token exists for now
      // Comment out JWT decoding temporarily to isolate the issue
      console.log('AuthService: Token exists, returning true');
      return true;

      // Uncomment this when basic flow works:
      /*
      const payload = this.decodeJWT(token);
      console.log('AuthService: decoded payload:', payload);

      if (!payload || !payload.exp) {
        console.log('AuthService: Invalid payload');
        return false;
      }

      const isValid = payload.exp > Date.now() / 1000;
      console.log('AuthService: token is valid:', isValid);
      return isValid;
      */
    } catch (error) {
      console.error('AuthService: Error checking login status:', error);
      return false;
    }
  }

  logout(): void {
    console.log('AuthService: logout called');
    localStorage.removeItem('jwt');
    this._isAuthentificatedSubject$.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getCurrentUser(): any {
    try {
      const token = this.getToken();
      if (!token) return null;

      const payload = this.decodeJWT(token);
      return payload ? payload.user || payload : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  private checkAuthStatus(): void {
    console.log('AuthService: checkAuthStatus called');
    const isLoggedIn = this.isLoggedIn();
    console.log('AuthService: setting authenticated status to:', isLoggedIn);
    this._isAuthentificatedSubject$.next(isLoggedIn);
  }

  private decodeJWT(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT token format');
      }

      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

      const padLength = 4 - (base64.length % 4);
      const paddedBase64 = padLength === 4 ? base64 : base64 + '='.repeat(padLength);

      const jsonPayload = decodeURIComponent(
        atob(paddedBase64)
          .split('')
          .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }
}
