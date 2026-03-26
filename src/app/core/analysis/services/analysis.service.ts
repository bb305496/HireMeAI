import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisResponse } from '../model/analysis.model';
import { ApiConfigService } from '../../services/api-config.service';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);

  analyzeCv(cv: File, jobOffer: string, isUrl: boolean): Observable<AnalysisResponse> {
    const formData = new FormData();
    formData.append('cv', cv);
    formData.append('jobOffer', jobOffer);
    formData.append('isUrl', String(isUrl));

    return this.http.post<AnalysisResponse>(
      `${this.apiConfig.baseUrl}/analysis/analyze`,
      formData,
      { withCredentials: true }
    );
  }
}
