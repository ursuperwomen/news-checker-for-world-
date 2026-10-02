import React, { useState } from 'react';
import { 
  Chrome, 
  Download, 
  ShieldAlert, 
  ShieldCheck, 
  ExternalLink, 
  Eye, 
  Check, 
  AlertTriangle, 
  Share2, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { SocialFeedPost } from '../types.ts';

interface ExtensionSimulatorProps {
  onInspectPost: (claimText: string) => void;
  onOpenFileReport: (claimText: string) => void;
}

const MOCK_SOCIAL_POSTS: SocialFeedPost[] = [
  {
    id: 'post-insta-1',
    platform: 'instagram',
    author: 'World Breaking Geopolitics Now',
    handle: '@geopolitics_war_alerts',
    avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&auto=format&fit=crop&q=80',
    timeAgo: '12m ago',
    content: '🚨🚨 EMERGENCY ALERT: China and Europe have officially declared World War 3! NATO mobilizing 400,000 troops to the South China Sea within 48 hours! SHARE THIS BEFORE IT IS CENSORED! 🇨🇳⚔️🇪🇺 #WW3 #BreakingNews #WarAlert',
    mediaBadge: 'AI REEL · DRAMATIC SYNTHETIC SIRENS & ARCHIVAL PARADE',
    views: '2.4M',
    shares: '412K',
    likes: '189K',
    knownVerdict: 'FAKE',
    verdictSummary: 'Fabricated war hoax. Complete absence of any declaration or reporting in Xinhua, People’s Daily, Le Monde, BBC, or Reuters.',
    countryRelevance: 'China · European Union · Global',
  },
  {
    id: 'post-tiktok-2',
    platform: 'tiktok',
    author: 'Deep Crisis Tracker',
    handle: '@crisis_daily_intel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    timeAgo: '1h ago',
    content: '⚠️ Leaked emergency audio broadcast: European energy authorities warn entire continental electrical grid will collapse tomorrow due to solar superstorm. Stockpile food now.',
    mediaBadge: 'AI SYNTHETIC AUDIO CLONE · ELEVENLABS PATTERN DETECTED',
    views: '890K',
    shares: '94K',
    likes: '62K',
    knownVerdict: 'AI_GENERATED',
    verdictSummary: 'Synthetic voice clone mimicking emergency sirens. ENTSO-E and EU grid regulators report 100% normal operational capacity.',
    countryRelevance: 'European Union',
  },
  {
    id: 'post-x-3',
    platform: 'x',
    author: 'Global Diplomatic Review',
    handle: '@diplomatic_wire',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    timeAgo: '3h ago',
    content: 'Historic milestone: 175 member states at the United Nations pass the legally binding Global Plastics Treaty resolution in Nairobi. Full ratification scheduled for next quarter.',
    views: '340K',
    shares: '18K',
    likes: '51K',
    knownVerdict: 'VERIFIED_TRUE',
    verdictSummary: 'Verified authentic news. Documented across Reuters, Associated Press, Le Monde, and official UN Environment Programme records.',
    countryRelevance: 'United Nations · Global',
  },
];

export const ExtensionSimulator: React.FC<ExtensionSimulatorProps> = ({
  onInspectPost,
  onOpenFileReport,
}) => {
  const [extensionEnabled, setExtensionEnabled] = useState(true);
  const [activePlatformTab, setActivePlatformTab] = useState<'instagram' | 'x' | 'tiktok'>('instagram');
  const [showExtensionPopup, setShowExtensionPopup] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [popupInput, setPopupInput] = useState('');
  const [popupResult, setPopupResult] = useState<string | null>(null);

  const filteredPosts = MOCK_SOCIAL_POSTS.filter((p) => p.platform === activePlatformTab);

  const handleDownloadExtension = async () => {
    setDownloadingZip(true);
    try {
      const response = await fetch('/api/extension/download');
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'trace-chrome-extension.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading extension:', err);
      alert('Could not download extension zip. Please retry.');
    } finally {
      setDownloadingZip(false);
    }
  };

  const handlePopupCheck = () => {
    if (!popupInput.trim()) return;
    if (/china.*europe.*ww3|world war 3/i.test(popupInput)) {
      setPopupResult('🔴 FAKE WAR HOAX: 0/150 accredited global press outlets corroborate. Zero military engagement.');
    } else {
      setPopupResult('⚠️ SCAN COMPLETE: No official government or newspaper archives corroborate this claim.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Chrome Extension Download & Architecture Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs">
            <Chrome className="w-4 h-4" />
            <span>TRACE MANIFEST V3 CHROME EXTENSION</span>
            <span>·</span>
            <span>REAL-TIME IN-FEED FACT CHECKING</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-100">
            Real-Time Fact-Checking While Browsing Social Media
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Install the TRACE Chrome extension to automatically flag deepfakes, synthetic AI sirens, and fake war rumors like the viral Instagram "China & Europe WW3" claim right in your social feeds before they deceive you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadExtension}
            disabled={downloadingZip}
            className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-xs shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloadingZip ? 'Packaging Extension...' : 'Download Chrome Extension (.zip)'}</span>
          </button>
        </div>
      </div>

      {/* Quick 3-Step Setup Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
          <div className="text-sky-400 font-bold">STEP 01: UNZIP PACKAGE</div>
          <p className="text-slate-400 font-sans">
            Download <span className="text-slate-200">trace-chrome-extension.zip</span> above and extract the folder to your computer.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
          <div className="text-sky-400 font-bold">STEP 02: OPEN EXTENSIONS</div>
          <p className="text-slate-400 font-sans">
            In Chrome, navigate to <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">chrome://extensions</code> and toggle <strong className="text-slate-200">Developer mode</strong> (top right).
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
          <div className="text-sky-400 font-bold">STEP 03: LOAD UNPACKED</div>
          <p className="text-slate-400 font-sans">
            Click <strong className="text-slate-200">"Load unpacked"</strong>, select the unzipped directory, and enjoy live in-feed protection!
          </p>
        </div>
      </div>

      {/* Live Interactive Browser Simulator */}
      <div className="rounded-2xl border border-slate-700/80 bg-slate-950 shadow-2xl overflow-hidden">
        {/* Browser Chrome Header (Tabs, URL bar, Extension icon) */}
        <div className="bg-slate-900 border-b border-slate-800 p-3 space-y-2.5">
          {/* Window dots & tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* Social Feed Switcher Tabs */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActivePlatformTab('instagram')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  activePlatformTab === 'instagram'
                    ? 'bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Instagram Feed
              </button>
              <button
                onClick={() => setActivePlatformTab('tiktok')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  activePlatformTab === 'tiktok'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                TikTok Feed
              </button>
              <button
                onClick={() => setActivePlatformTab('x')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  activePlatformTab === 'x'
                    ? 'bg-slate-800 text-slate-100 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                X / Twitter
              </button>
            </div>

            {/* Extension Active Toggle */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden sm:inline">TRACE Shield:</span>
              <button
                onClick={() => setExtensionEnabled(!extensionEnabled)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                  extensionEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {extensionEnabled ? 'ACTIVE (INLINE VERIFICATION ON)' : 'OFF (TEST UNPROTECTED)'}
              </button>
            </div>
          </div>

          {/* Browser Address & Toolbars Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-emerald-400 text-[10px]">🔒 https://</span>
              <span>
                {activePlatformTab === 'instagram'
                  ? 'instagram.com/explore/reels/'
                  : activePlatformTab === 'tiktok'
                  ? 'tiktok.com/@crisis_daily_intel/video'
                  : 'x.com/home'}
              </span>
            </div>

            {/* Clickable TRACE Browser Extension Action Icon */}
            <div className="relative">
              <button
                onClick={() => setShowExtensionPopup(!showExtensionPopup)}
                className="relative p-2 rounded-lg bg-sky-500/10 border border-sky-500/40 text-sky-400 hover:bg-sky-500/20 transition-colors shadow-sm"
                title="Open TRACE Chrome Extension Popup"
              >
                <Chrome className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] flex items-center justify-center font-bold">
                  2
                </span>
              </button>

              {/* Simulated Extension Popup Box */}
              {showExtensionPopup && (
                <div className="absolute right-0 top-10 w-80 sm:w-96 bg-slate-900 border border-sky-500/40 rounded-xl p-4 shadow-2xl z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2 font-display font-bold text-xs text-sky-400">
                      <Chrome className="w-4 h-4" />
                      <span>TRACE REAL-TIME BROWSER SHIELD</span>
                    </div>
                    <button
                      onClick={() => setShowExtensionPopup(false)}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Active on this tab. 2 viral unverified claims detected in feed:
                  </p>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={popupInput}
                      onChange={(e) => setPopupInput(e.target.value)}
                      placeholder="Paste any quote or inspect active page..."
                      className="w-full text-xs p-2 rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={handlePopupCheck}
                      className="w-full py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors"
                    >
                      Instant Fact-Check
                    </button>
                  </div>

                  {popupResult && (
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
                      {popupResult}
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800 flex items-center justify-between">
                    <span>120+ Global Press Archives</span>
                    <span className="text-emerald-400">Connected</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Simulated Social Media Feed Container */}
        <div className="p-4 sm:p-8 bg-slate-950/90 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-3">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Simulated {activePlatformTab.toUpperCase()} Social Stream
            </span>
            <span className="text-[11px] text-slate-400">
              {extensionEnabled ? (
                <span className="text-emerald-400 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  TRACE In-Feed Scanning Active
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Unprotected Feed
                </span>
              )}
            </span>
          </div>

          {/* Social Posts Loop */}
          {filteredPosts.map((post) => {
            const isFake = post.knownVerdict === 'FAKE';
            const isAI = post.knownVerdict === 'AI_GENERATED';
            const isVerified = post.knownVerdict === 'VERIFIED_TRUE';

            return (
              <div
                key={post.id}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4 shadow-md transition-all relative overflow-hidden"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="font-semibold text-xs text-slate-100 flex items-center gap-1">
                        <span>{post.author}</span>
                        {isFake && (
                          <span className="text-[10px] text-rose-400 font-mono">(Viral Clickbait)</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {post.handle} · {post.timeAgo}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {post.views} views
                  </span>
                </div>

                {/* Post Content */}
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {post.content}
                </p>

                {/* Media description badge */}
                {post.mediaBadge && (
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-amber-300 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Media Analysis: {post.mediaBadge}</span>
                  </div>
                )}

                {/* INLINE EXTENSION FACT-CHECK OVERLAY (Simulating Chrome Extension) */}
                {extensionEnabled && (
                  <div
                    className={`p-3.5 rounded-xl border transition-all ${
                      isFake
                        ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                        : isAI
                        ? 'bg-purple-950/30 border-purple-500/40 text-purple-200'
                        : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 font-display font-bold text-xs">
                        {isFake ? (
                          <>
                            <ShieldAlert className="w-4 h-4 text-rose-400" />
                            <span className="text-rose-300">
                              TRACE ALERT: FABRICATED DISINFORMATION (0/150 PRESS SOURCES CONFIRM)
                            </span>
                          </>
                        ) : isAI ? (
                          <>
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300">
                              TRACE ALERT: SYNTHETIC AI VOCAL CLONE DETECTED
                            </span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-300">
                              TRACE VERIFIED: CONFIRMED BY GLOBAL PRESS WIRES
                            </span>
                          </>
                        )}
                      </div>
                      <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded">
                        EXTENSION OVERLAY
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-normal mb-2.5">
                      {post.verdictSummary}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-current/20">
                      <button
                        onClick={() => onInspectPost(post.content)}
                        className="px-3 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Full Evidence Dossier</span>
                      </button>

                      {isFake && (
                        <button
                          onClick={() => onOpenFileReport(post.content)}
                          className="px-3 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 font-semibold text-xs transition-colors"
                        >
                          Report & Flag to Takedown Registry
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Social interactions footer */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-4">
                    <span>❤️ {post.likes}</span>
                    <span>🔁 {post.shares}</span>
                  </div>
                  <span className="text-[11px] font-mono">
                    Jurisdiction: {post.countryRelevance}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
