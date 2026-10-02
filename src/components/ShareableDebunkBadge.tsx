import React, { useState } from 'react';
import { Copy, Check, Share2, ShieldAlert, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import { VerificationResult } from '../types.ts';

interface ShareableDebunkBadgeProps {
  result: VerificationResult;
}

export const ShareableDebunkBadge: React.FC<ShareableDebunkBadgeProps> = ({ result }) => {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isFakeOrAI = result.verdict === 'FAKE' || result.verdict === 'AI_GENERATED';
  const isVerified = result.verdict === 'VERIFIED_TRUE';

  const debunkText = result.suggestedDebunkPost || `[TRACE Fact-Check] Claim: "${result.headline}". Status: ${result.verdictLabel}. Proof: Verified via international wire archives. No accredited global press corroborates this.`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(debunkText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          {isFakeOrAI ? (
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          )}
          <span className="font-display font-semibold text-sm text-slate-200">
            Shareable Debunk Card for Social Comments
          </span>
        </div>
        <span className="font-mono text-xs text-slate-400">
          ID: {result.id}
        </span>
      </div>

      <p className="text-xs text-slate-400">
        Paste this verified notice under misleading Instagram reels, TikTok videos, or X posts to stop rumors from spreading:
      </p>

      {/* Styled card preview */}
      <div className={`p-4 rounded-lg border font-mono text-xs leading-relaxed ${
        isFakeOrAI 
          ? 'bg-rose-950/20 border-rose-500/30 text-rose-200' 
          : isVerified 
          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
          : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
      }`}>
        <div className="font-bold flex items-center justify-between mb-2">
          <span>{isFakeOrAI ? '🚨 TRACE FACT-CHECK ALERT' : '✅ TRACE VERIFIED FACT'}</span>
          <span className="text-[10px] opacity-75">{new Date(result.timestamp).toLocaleDateString()}</span>
        </div>
        <p className="mb-2 font-sans font-medium text-slate-100">
          "{result.headline}"
        </p>
        <p className="text-xs opacity-90 mb-3 font-sans">
          <strong>VERDICT:</strong> {result.verdictLabel} ({result.confidenceScore}% confidence).<br />
          {result.realityProof.slice(0, 220)}...
        </p>
        <div className="pt-2 border-t border-current/20 flex items-center justify-between text-[11px]">
          <span>Cross-referenced across international press archives</span>
          <span className="underline font-bold">trace-osint.org</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <button
          onClick={handleCopyText}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/30 hover:bg-sky-500/20 transition-colors"
        >
          {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedText ? 'Copied Comment Text!' : 'Copy Instagram/TikTok Comment'}</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-700"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>Share Link</span>
        </button>

        <button
          onClick={handlePrintDossier}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-700"
          title="Print or Save as PDF"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export PDF Dossier</span>
        </button>
      </div>
    </div>
  );
};
