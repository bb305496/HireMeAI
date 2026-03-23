import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../services/api-config-service';
import {AuthResponse, LoginRequest, RegisterRequest} from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http      = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiConfig.baseUrl}/auth/register`,
      data,
      { withCredentials: true }
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiConfig.baseUrl}/auth/login`,
      data,
      { withCredentials: true }
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.apiConfig.baseUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }
}
