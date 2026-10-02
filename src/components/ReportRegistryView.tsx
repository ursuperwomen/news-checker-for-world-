import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Flag, 
  ExternalLink, 
  ShieldAlert, 
  ShieldCheck, 
  Download, 
  Copy, 
  Check, 
  Filter, 
  ArrowUpRight 
} from 'lucide-react';
import { MisinformationReport } from '../types.ts';

interface ReportRegistryViewProps {
  reports: MisinformationReport[];
  onOpenReportModal: () => void;
  onVerifyClaim: (claim: string) => void;
}

export const ReportRegistryView: React.FC<ReportRegistryViewProps> = ({
  reports,
  onOpenReportModal,
  onVerifyClaim,
}) => {
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredReports = reports.filter((r) => {
    const matchesPlatform = platformFilter === 'All' || r.platform === platformFilter;
    const matchesSeverity = severityFilter === 'All' || r.severity === severityFilter;
    return matchesPlatform && matchesSeverity;
  });

  const handleCopyNotice = (report: MisinformationReport) => {
    const notice = `[TRACE REPORT ${report.id}] Flagged as ${report.status} (${report.category}). Analysis: ${report.debunkSummary || 'Zero corroboration across international press archives'}. Verify at trace-osint.org`;
    navigator.clipboard.writeText(notice);
    setCopiedId(report.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(reports, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trace-misinformation-registry-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>DISINFORMATION TAKEDOWN & INCIDENT DOSSIER</span>
            <span>·</span>
            <span>LIVE COMMUNITY REGISTRY</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-100">
            Crowdsourced Misinformation Takedown Registry
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Incident reports filed by users and automated OSINT web monitors. Every entry is cross-referenced with accredited global newspapers, archiving viral hoaxes, deepfakes, and coordinate takedown recommendations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-rose-600/20"
          >
            <Flag className="w-4 h-4" />
            <span>Flag New Misinformation</span>
          </button>
          <button
            onClick={handleExportJson}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Registry (JSON)</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800/80 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter Platform:
          </span>
          {['All', 'Instagram', 'TikTok', 'X/Twitter', 'Web Article'].map((plat) => (
            <button
              key={plat}
              onClick={() => setPlatformFilter(plat)}
              className={`px-2.5 py-1 rounded transition-colors ${
                platformFilter === plat
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-400">Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2 py-1 focus:outline-none"
          >
            <option value="All">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="space-y-4">
        {filteredReports.map((report) => {
          const isFake = report.status === 'VERIFIED_FAKE';
          const isAI = report.status === 'VERIFIED_AI';
          const isTrue = report.status === 'VERIFIED_TRUE';

          return (
            <div
              key={report.id}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="font-bold text-slate-100">{report.id}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400">{report.platform}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400">{report.category}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400">{new Date(report.reportedAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    report.severity === 'CRITICAL'
                      ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                      : report.severity === 'HIGH'
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {report.severity}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded font-bold ${
                    isFake
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : isAI
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : isTrue
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>

              {/* Claim Body */}
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                  "{report.claim}"
                </h4>
                {report.sourceUrl && (
                  <a
                    href={report.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-mono pt-0.5"
                  >
                    <span>Source Link: {report.sourceUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Debunk summary / analysis */}
              {report.debunkSummary && (
                <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <strong className="text-slate-100 font-mono text-[11px] block">
                    TRACE Investigation Findings:
                  </strong>
                  <p>{report.debunkSummary}</p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <span>Action: <strong>{report.takedownStatus}</strong></span>
                  <span>·</span>
                  <span>Flagged by {report.flaggedBy}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyNotice(report)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium border border-slate-700"
                  >
                    {copiedId === report.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Debunk Reply</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Social Debunk Reply</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onVerifyClaim(report.claim)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-colors font-semibold"
                  >
                    <span>Run Full Terminal Audit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
