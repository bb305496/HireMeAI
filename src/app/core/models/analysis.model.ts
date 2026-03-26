export interface AnalysisResponse {
  reasoning: string;
  matchPercentage: number;
  overallRating: number;
  missingSkills: string[];
  suggestions: string[];
  strengths: string[];
  summary: string;
}
