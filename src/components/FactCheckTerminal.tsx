import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Globe2, 
  Clock, 
  Loader2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  FileQuestion,
  Layers,
  ChevronDown
} from 'lucide-react';
import { VerificationResult } from '../types.ts';
import { VerificationDossier } from './VerificationDossier.tsx';

interface FactCheckTerminalProps {
  onOpenFileReport: (claim: string) => void;
}

const PRESET_QUERIES = [
  {
    label: 'China & Europe WW3 Viral Instagram Claim',
    query: 'China and Europe have declared World War 3, with NATO and Chinese forces mobilizing for immediate conflict',
    tag: 'War Hoax',
    platform: 'Instagram Reel',
  },
  {
    label: 'Nationwide Power Grid Collapse Video',
    query: 'Viral video warns European Union facing imminent total electrical grid shutdown due to extreme solar flares',
    tag: 'AI Video',
    platform: 'TikTok',
  },
  {
    label: 'Defense Minister Deepfake Audio Bank Freeze',
    query: 'Leaked emergency audio of defense official ordering mandatory nationwide commercial bank deposit freeze',
    tag: 'Voice Clone',
    platform: 'X / Telegram',
  },
  {
    label: 'UN Global Plastics Treaty Signing',
    query: 'United Nations delegates approve legally binding global agreement to end plastic pollution in diplomatic assembly',
    tag: 'Verified True',
    platform: 'Press Wire',
  },
];

export const FactCheckTerminal: React.FC<FactCheckTerminalProps> = ({ onOpenFileReport }) => {
  const [claim, setClaim] = useState('');
  const [countryFilter, setCountryFilter] = useState('Global Consensus');
  const [timeRange, setTimeRange] = useState('All Time');
  const [mediaAttachment, setMediaAttachment] = useState('');
  const [showMediaInput, setShowMediaInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async (claimToVerify?: string) => {
    const textToSearch = claimToVerify || claim;
    if (!textToSearch.trim()) return;

    setLoading(true);
    setError(null);
    if (claimToVerify) {
      setClaim(claimToVerify);
    }

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claim: textToSearch,
          countryFilter,
          timeRange,
          mediaAttachment: mediaAttachment.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || 'Verification request failed');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err: any) {
      console.error('Fact verification error:', err);
      setError(err?.message || 'Failed to complete investigative verification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Terminal Hero & Input Command Console */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>GLOBAL OSINT INVESTIGATION ENGINE</span>
            <span>·</span>
            <span>GOOGLE SEARCH GROUNDED</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            Verify Any Viral Headline, Rumor, or Synthetic Media
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed">
            Cross-examine social media narratives across international newspapers, state press wires, and synthetic media detectors in real time. If true, inspect empirical proof. If fake or AI-generated, reveal the fabrication trail.
          </p>
        </div>

        {/* Input Bar */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <textarea
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder="Paste social media claim, Instagram reel caption, TikTok rumor, or headline (e.g. 'China and Europe having WW3')..."
              rows={3}
              className="w-full rounded-xl bg-slate-950/80 border border-slate-700/80 p-4 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-sans"
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowMediaInput(!showMediaInput)}
                className="text-xs font-mono text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors"
              >
                {showMediaInput ? 'Hide Media Context' : '+ Add Media/Context'}
              </button>
            </div>
          </div>

          {/* Optional Media Context input */}
          {showMediaInput && (
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
              <label className="text-xs font-mono text-slate-400 block">
                Visual or Audio Characteristics (Optional context):
              </label>
              <input
                type="text"
                value={mediaAttachment}
                onChange={(e) => setMediaAttachment(e.target.value)}
                placeholder="e.g. Robotic voiceover with dramatic siren sounds; grainy military tank footage from 2018..."
                className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
            </div>
          )}

          {/* Investigation Parameter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              {/* Regional Focus */}
              <div className="flex items-center gap-1.5 bg-slate-950/70 border border-slate-800 px-2.5 py-1.5 rounded-lg text-xs">
                <Globe2 className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-slate-400">Press Focus:</span>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="Global Consensus" className="bg-slate-900">Global Consensus</option>
                  <option value="European Union & UK" className="bg-slate-900">European Union & UK (BBC, Le Monde, Spiegel)</option>
                  <option value="China & East Asia" className="bg-slate-900">China & East Asia (Xinhua, People's Daily, SCMP)</option>
                  <option value="United States & Americas" className="bg-slate-900">United States (Reuters, AP, NYT, WaPo)</option>
                  <option value="Middle East & North Africa" className="bg-slate-900">Middle East (Al Jazeera, Asharq Al-Awsat)</option>
                  <option value="South Asia & India" className="bg-slate-900">South Asia (The Hindu, Indian Express, Dawn)</option>
                </select>
              </div>

              {/* Time Range */}
              <div className="flex items-center gap-1.5 bg-slate-950/70 border border-slate-800 px-2.5 py-1.5 rounded-lg text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">Archive Range:</span>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All Time" className="bg-slate-900">All Time / Any Era</option>
                  <option value="Past 24 Hours" className="bg-slate-900">Breaking (Past 24 Hours)</option>
                  <option value="Past 7 Days" className="bg-slate-900">Past 7 Days</option>
                  <option value="Past 30 Days" className="bg-slate-900">Past Month</option>
                  <option value="Historical Archive" className="bg-slate-900">Historical Archive</option>
                </select>
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={() => handleVerify()}
              disabled={loading || !claim.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Cross-Examining Press Archives...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Evaluate Authenticity & Proof</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Test Presets (Highlighting user's viral China-Europe WW3 prompt!) */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Or test high-traffic viral rumors & verified events:</span>
            <span className="font-mono text-[10px] text-sky-400">1-CLICK BENCHMARKS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_QUERIES.map((preset, index) => (
              <button
                key={index}
                onClick={() => handleVerify(preset.query)}
                className="text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-sky-500/50 hover:bg-slate-950 transition-all flex items-start justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-sky-300 transition-colors">
                      {preset.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    "{preset.query}"
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {preset.tag}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {preset.platform}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Progress Radar */}
      {loading && (
        <div className="p-8 rounded-2xl border border-sky-500/20 bg-slate-900/60 backdrop-blur-xl text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-sky-500/20 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-t-sky-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
              <Globe2 className="w-7 h-7 text-sky-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-semibold text-slate-100 text-base">
              Executing Multi-Archive Forensic Corroboration
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Scanning Google Search grounding index, querying accredited wire services (Reuters, AP, BBC, Le Monde, Xinhua), and evaluating synthetic audio/visual markers...
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              120+ International Press Feeds
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Synthetics & Deepfake Classifier
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Government & Treaty Registry
            </span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Investigation Failed</div>
            <div className="mt-1">{error}</div>
          </div>
        </div>
      )}

      {/* Verification Result Output */}
      {result && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
            <span>Showing verified investigation dossier for "{result.query}"</span>
            <button
              onClick={() => {
                setResult(null);
                setClaim('');
              }}
              className="text-sky-400 hover:underline"
            >
              Clear & New Search
            </button>
          </div>
          <VerificationDossier 
            result={result} 
            onFileReport={(claimText) => onOpenFileReport(claimText)} 
          />
        </div>
      )}
    </div>
  );
};
