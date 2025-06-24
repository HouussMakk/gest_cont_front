import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest, LoginResponse, RegisterRequest} from '../models/authModels';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginEndpoint = "http://localhost:8086/auth/login";
  private requestEndPOint = "http://localhost:8086/auth/signup"
  private _isAuthentificatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthentificated = this._isAuthentificatedSubject$.asObservable();
  public setAuthentificated(state:boolean,jwt:string  ){
    this._isAuthentificatedSubject$.next(state);
    window.localStorage.setItem("jwt",jwt);
  }
  constructor(private httpClient:HttpClient) { }
  login(loginRequest:LoginRequest){
    return this.httpClient.post<LoginResponse>(this.loginEndpoint,loginRequest);
  }
  register(registerRequest:RegisterRequest){
    return this.httpClient.post(this.requestEndPOint,registerRequest);
  }
  isLoggedIn() {

    const token = localStorage.getItem('jwt'); // get token from local storage

    const payload ="1" // decode payload of token

    const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return parsedPayload.exp > Date.now() / 1000; // check if token is expired

  }
}
