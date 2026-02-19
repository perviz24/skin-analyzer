export interface SkinFinding {
  area: string;
  concern: string;
  severity: string;
  description: string;
}

export interface TreatmentRecommendation {
  treatmentSlug: string;
  reason: string;
  priority: string;
  concerns: string[];
}

export interface SkinAnalysisResult {
  id: string;
  overallScore: number;
  skinAge?: number;
  summary: string;
  positives: string[];
  findings: SkinFinding[];
  recommendations: TreatmentRecommendation[];
  createdAt: number;
  isDemo?: boolean;
}
