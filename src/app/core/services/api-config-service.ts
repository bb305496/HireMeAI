import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export type ApiEnvironment = 'local' | 'remote';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  baseUrl = environment.apiUrl;
}
