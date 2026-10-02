/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { FactCheckTerminal } from './components/FactCheckTerminal.tsx';
import { GlobalPressMatrix } from './components/GlobalPressMatrix.tsx';
import { ExtensionSimulator } from './components/ExtensionSimulator.tsx';
import { ReportRegistryView } from './components/ReportRegistryView.tsx';
import { ReportIncidentModal } from './components/ReportIncidentModal.tsx';
import { MisinformationReport } from './types.ts';
import { ShieldCheck, Globe, Chrome, Flag, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'press' | 'extension' | 'reports'>('terminal');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportModalClaim, setReportModalClaim] = useState('');
  const [reports, setReports] = useState<MisinformationReport[]>([]);

  // Fetch registered reports
  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (data.reports) {
          setReports(data.reports);
        }
      })
      .catch((err) => console.error('Failed to load initial reports:', err));
  }, []);

  const handleOpenFileReport = (claimText: string) => {
    setReportModalClaim(claimText);
    setIsReportModalOpen(true);
  };

  const handleReportFiled = (newReport: MisinformationReport) => {
    setReports((prev) => [newReport, ...prev]);
  };

  const handleVerifyClaimFromAnywhere = (claim: string, country?: string) => {
    setActiveTab('terminal');
    // We can dispatch or set input
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.value = claim;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        const buttons = document.querySelectorAll('button');
        const evaluateBtn = Array.from(buttons).find(b => b.textContent?.includes('Evaluate Authenticity'));
        if (evaluateBtn) {
          evaluateBtn.click();
        }
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => handleOpenFileReport('')}
        pendingReportsCount={reports.length}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'terminal' && (
          <FactCheckTerminal onOpenFileReport={handleOpenFileReport} />
        )}

        {activeTab === 'press' && (
          <GlobalPressMatrix
            onSelectQueryForVerification={(q, c) => handleVerifyClaimFromAnywhere(q, c)}
          />
        )}

        {activeTab === 'extension' && (
          <ExtensionSimulator
            onInspectPost={(claim) => handleVerifyClaimFromAnywhere(claim)}
            onOpenFileReport={handleOpenFileReport}
          />
        )}

        {activeTab === 'reports' && (
          <ReportRegistryView
            reports={reports}
            onOpenReportModal={() => handleOpenFileReport('')}
            onVerifyClaim={(claim) => handleVerifyClaimFromAnywhere(claim)}
          />
        )}
      </main>

      {/* Global Incident Flagging Modal */}
      <ReportIncidentModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        initialClaim={reportModalClaim}
        onReportFiled={handleReportFiled}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span className="font-display font-semibold text-slate-200">
              TRACE OSINT Verification Terminal
            </span>
            <span>·</span>
            <span>Grounded via Google Search & International Wire Archives</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>120+ Press Feeds</span>
            <span>·</span>
            <span>Manifest V3 Extension Ready</span>
            <span>·</span>
            <span>Synthetic Media Forensic Suite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
