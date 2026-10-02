import React from 'react';
import { ShieldCheck, Search, Globe, Chrome, Flag, AlertTriangle, Radio } from 'lucide-react';

interface HeaderProps {
  activeTab: 'terminal' | 'press' | 'extension' | 'reports';
  setActiveTab: (tab: 'terminal' | 'press' | 'extension' | 'reports') => void;
  onOpenReportModal: () => void;
  pendingReportsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  pendingReportsCount,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Identity */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('terminal')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 transition-colors shadow-sm">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg tracking-wider text-slate-100">
                    TRACE
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 border-l border-slate-700 pl-2">
                    OSINT VERIFICATION
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  <span>Global Press Grounding & Media Forensic Terminal</span>
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Controls */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'terminal'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Fact Terminal</span>
            </button>

            <button
              onClick={() => setActiveTab('press')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'press'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Global Press Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('extension')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'extension'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Chrome className="w-3.5 h-3.5" />
              <span>Chrome Extension & Social Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'reports'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Debunk Registry</span>
              {pendingReportsCount > 0 && (
                <span className="font-mono text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                  {pendingReportsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReportModal}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 hover:border-rose-400 transition-colors shadow-sm"
            >
              <Flag className="w-3.5 h-3.5 text-rose-400" />
              <span>Flag Misinformation</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-800/60 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'terminal' ? 'bg-sky-500/20 text-sky-300 font-medium' : 'text-slate-400'
            }`}
          >
            Fact Terminal
          </button>
          <button
            onClick={() => setActiveTab('press')}
            className={`px-3 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'press' ? 'bg-sky-500/20 text-sky-300 font-medium' : 'text-slate-400'
            }`}
          >
            Global Press
          </button>
          <button
            onClick={() => setActiveTab('extension')}
            className={`px-3 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'extension' ? 'bg-sky-500/20 text-sky-300 font-medium' : 'text-slate-400'
            }`}
          >
            Chrome Ext & Feed
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'reports' ? 'bg-sky-500/20 text-sky-300 font-medium' : 'text-slate-400'
            }`}
          >
            Reports ({pendingReportsCount})
          </button>
        </div>
      </div>
    </header>
  );
};
