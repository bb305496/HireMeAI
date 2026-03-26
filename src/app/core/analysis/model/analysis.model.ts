export interface AnalysisResponse {
  reasoning: string;
  matchPercentage: number;
  overallRating: number;
  missingSkills: string[];
  suggestions: string[];
  strengths: string[];
  summary: string;
}

export interface AnalysisData {
  cv: File;
  jobOffer: string;
  isUrl: boolean
}
