import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Cpu, 
  ExternalLink, 
  Globe2, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Search,
  Clock,
  Sparkles
} from 'lucide-react';
import { VerificationResult } from '../types.ts';
import { ShareableDebunkBadge } from './ShareableDebunkBadge.tsx';

interface VerificationDossierProps {
  result: VerificationResult;
  onFileReport?: (claim: string) => void;
}

export const VerificationDossier: React.FC<VerificationDossierProps> = ({ 
  result, 
  onFileReport 
}) => {
  const isFake = result.verdict === 'FAKE';
  const isAI = result.verdict === 'AI_GENERATED';
  const isMisleading = result.verdict === 'MISLEADING';
  const isTrue = result.verdict === 'VERIFIED_TRUE';

  const getVerdictStyle = () => {
    if (isFake) {
      return {
        badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
        glow: 'from-rose-500/20 via-transparent to-transparent',
        icon: ShieldAlert,
        iconColor: 'text-rose-400',
        titleColor: 'text-rose-200',
        label: 'FABRICATED HOAX / FAKE NEWS',
      };
    }
    if (isAI) {
      return {
        badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
        glow: 'from-purple-500/20 via-transparent to-transparent',
        icon: Cpu,
        iconColor: 'text-purple-400',
        titleColor: 'text-purple-200',
        label: 'AI-GENERATED / SYNTHETIC FABRICATION',
      };
    }
    if (isMisleading) {
      return {
        badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
        glow: 'from-amber-500/20 via-transparent to-transparent',
        icon: AlertTriangle,
        iconColor: 'text-amber-400',
        titleColor: 'text-amber-200',
        label: 'MISLEADING / OUT OF CONTEXT',
      };
    }
    return {
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      glow: 'from-emerald-500/20 via-transparent to-transparent',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      titleColor: 'text-emerald-200',
      label: 'VERIFIED AUTHENTIC NEWS',
    };
  };

  const style = getVerdictStyle();
  const IconComponent = style.icon;

  return (
    <div className="space-y-6">
      {/* Primary Verdict Banner */}
      <div className={`relative overflow-hidden rounded-2xl border bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl ${style.badgeBg}`}>
        <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br ${style.glow} blur-3xl pointer-events-none`} />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center">
                <IconComponent className={`w-7 h-7 ${style.iconColor}`} />
              </div>
              <div>
                <span className="font-mono text-[11px] tracking-wider uppercase text-slate-400">
                  OFFICIAL FORENSIC VERDICT
                </span>
                <h2 className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${style.titleColor}`}>
                  {result.verdictLabel || style.label}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-right">
                <div className="text-[10px] text-slate-400">OSINT CONFIDENCE</div>
                <div className="text-slate-100 font-semibold text-sm">{result.confidenceScore}%</div>
              </div>
              {result.aiGeneratedProbability > 0 && (
                <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-right">
                  <div className="text-[10px] text-purple-400">AI MANIPULATION</div>
                  <div className="text-purple-300 font-semibold text-sm">{result.aiGeneratedProbability}%</div>
                </div>
              )}
            </div>
          </div>

          {/* Investigated Claim Header */}
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400">INVESTIGATED CLAIM:</div>
            <p className="text-base sm:text-lg font-medium text-slate-100 italic leading-snug">
              "{result.query}"
            </p>
          </div>

          {/* Executive Summary */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
            <strong className="text-slate-100">Summary: </strong>
            {result.executiveSummary}
          </div>
        </div>
      </div>

      {/* Grid: Reality & Proof vs Global Newspaper Cross-Examination */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Reality & Forensic Proof (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Reality & Definitive Evidence */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <FileText className="w-4 h-4 text-sky-400" />
              <h3 className="font-display font-semibold text-sm text-slate-100">
                The Verified Reality & Empirical Proof
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {result.realityProof}
            </p>

            {/* Sub-Claim Breakdown */}
            {result.verificationPoints && result.verificationPoints.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2.5">
                <div className="text-xs font-mono text-slate-400">VERIFICATION MATRIX BREAKDOWN:</div>
                <div className="space-y-2">
                  {result.verificationPoints.map((point, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 bg-slate-950/60 border border-slate-800/60 rounded-lg flex items-start gap-2.5 text-xs"
                    >
                      {point.status === 'FALSE' ? (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      ) : point.status === 'TRUE' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-semibold text-slate-200">{point.claim}</div>
                        <div className="text-slate-400 mt-1 leading-normal">{point.proof}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hoax & AI Hallmarks (if fake or AI) */}
          {result.hoaxBreakdown && (
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h3 className="font-display font-semibold text-sm text-slate-100">
                  Disinformation Anatomy & Synthetic Hallmarks
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/60">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Suspected Origin
                  </span>
                  <span className="text-slate-200 font-medium">
                    {result.hoaxBreakdown.fabricationOrigin}
                  </span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/60">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Disinformation Tactic
                  </span>
                  <span className="text-slate-200 font-medium">
                    {result.hoaxBreakdown.disinformationTechnique}
                  </span>
                </div>
              </div>

              {result.hoaxBreakdown.hallmarksOfAI && result.hoaxBreakdown.hallmarksOfAI.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  <span className="text-xs font-mono text-purple-300">Observed Synthetic / Manipulated Indicators:</span>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 bg-purple-950/10 p-3 rounded-lg border border-purple-500/20">
                    {result.hoaxBreakdown.hallmarksOfAI.map((hallmark, i) => (
                      <li key={i}>{hallmark}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Shareable Debunk Badge Component */}
          <ShareableDebunkBadge result={result} />
        </div>

        {/* Right Column: Global Newspaper Cross-Examination & Grounding Sources (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Global Newspapers Cross-Examination */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-sky-400" />
                <h3 className="font-display font-semibold text-sm text-slate-100">
                  Global Press Cross-Examination
                </h3>
              </div>
              <span className="font-mono text-[10px] text-slate-400">
                120+ Outlets Queried
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Cross-referenced against verified national news agencies, state wires, and accredited independent publishers:
            </p>

            <div className="space-y-3 pt-1">
              {result.globalNewspaperCrossExamination.map((regionData, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 bg-slate-950/70 border border-slate-800/70 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">
                      {regionData.region}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      regionData.coverageStatus.includes('ZERO') || regionData.coverageStatus.includes('DEBUNK')
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                        : regionData.coverageStatus.includes('CONFIRM')
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {regionData.coverageStatus}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-400 font-mono">
                    {regionData.newspaperNames.map((name, i) => (
                      <span key={i} className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-slate-300">
                        {name}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {regionData.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Grounding Sources & Links to Verify Facts */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                <h3 className="font-display font-semibold text-sm text-slate-100">
                  Primary Sources & Grounding Links
                </h3>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                Google Search Grounded
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Live web anchors retrieved by the verification engine to independently corroborate factuality:
            </p>

            <div className="space-y-2 pt-1">
              {result.groundingSources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-sky-400 group-hover:text-sky-300 truncate max-w-[280px]">
                      {source.title}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-400">
                    <span className="text-slate-300">{source.sourceDomain || 'news archive'}</span>
                    <span>·</span>
                    <span className="text-slate-400 truncate max-w-[200px]">{source.url}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Queries executed */}
            {result.webSearchQueries && result.webSearchQueries.length > 0 && (
              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
                  OSINT Search Trajectory:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.webSearchQueries.map((q, i) => (
                    <span key={i} className="text-[11px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                      "{q}"
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Action to File Report */}
          {onFileReport && (
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
              <div className="text-slate-300">
                Spotted this circulating on social media?
              </div>
              <button
                onClick={() => onFileReport(result.query)}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 font-medium transition-colors"
              >
                Log to Takedown Registry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
