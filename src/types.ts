export interface GroundingSource {
  title: string;
  url: string;
  snippet?: string;
  sourceDomain?: string;
}

export interface VerificationResult {
  id: string;
  query: string;
  timestamp: string;
  verdict: 'FAKE' | 'AI_GENERATED' | 'MISLEADING' | 'UNVERIFIED' | 'VERIFIED_TRUE';
  verdictLabel: string;
  confidenceScore: number;
  aiGeneratedProbability: number;
  headline: string;
  executiveSummary: string;
  realityProof: string;
  hoaxBreakdown?: {
    fabricationOrigin: string;
    disinformationTechnique: string;
    hallmarksOfAI: string[];
  };
  globalNewspaperCrossExamination: {
    region: string;
    newspaperNames: string[];
    coverageStatus: string;
    summary: string;
  }[];
  verificationPoints: {
    claim: string;
    status: 'FALSE' | 'TRUE' | 'MISLEADING';
    proof: string;
  }[];
  groundingSources: GroundingSource[];
  webSearchQueries?: string[];
  recommendedAction: string;
  suggestedDebunkPost: string;
  countryFilter?: string;
  timeRange?: string;
}

export interface MisinformationReport {
  id: string;
  claim: string;
  sourceUrl?: string;
  platform: 'Instagram' | 'X/Twitter' | 'TikTok' | 'Facebook' | 'WhatsApp' | 'YouTube' | 'Web Article';
  reportedAt: string;
  flaggedBy: string;
  status: 'PENDING_TRIAGE' | 'VERIFIED_FAKE' | 'VERIFIED_AI' | 'VERIFIED_TRUE' | 'INVESTIGATING';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'War/Geopolitics' | 'AI Deepfake' | 'Health/Disaster' | 'Elections' | 'Financial Scams';
  notes?: string;
  verificationId?: string;
  debunkSummary?: string;
  takedownStatus: 'Action Recommended' | 'Notice Dispatched' | 'Platform In Review' | 'Archived';
}

export interface SocialFeedPost {
  id: string;
  platform: 'instagram' | 'x' | 'tiktok';
  author: string;
  handle: string;
  avatar: string;
  timeAgo: string;
  content: string;
  mediaBadge?: string;
  views: string;
  shares: string;
  likes: string;
  knownVerdict: 'FAKE' | 'AI_GENERATED' | 'VERIFIED_TRUE' | 'SUSPICIOUS';
  verdictSummary: string;
  countryRelevance: string;
}
