import React, { useState } from 'react';
import { Flag, X, AlertTriangle, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { MisinformationReport } from '../types.ts';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClaim?: string;
  onReportFiled: (newReport: MisinformationReport) => void;
}

export const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({
  isOpen,
  onClose,
  initialClaim = '',
  onReportFiled,
}) => {
  const [claim, setClaim] = useState(initialClaim);
  const [sourceUrl, setSourceUrl] = useState('');
  const [platform, setPlatform] = useState<MisinformationReport['platform']>('Instagram');
  const [category, setCategory] = useState<MisinformationReport['category']>('War/Geopolitics');
  const [severity, setSeverity] = useState<MisinformationReport['severity']>('CRITICAL');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successReport, setSuccessReport] = useState<MisinformationReport | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claim: claim.trim(),
          sourceUrl: sourceUrl.trim() || undefined,
          platform,
          category,
          severity,
          notes: notes.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      const data = await response.json();
      setSuccessReport(data.report);
      onReportFiled(data.report);
    } catch (err: any) {
      alert(err?.message || 'Could not submit report.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessReport(null);
    setClaim('');
    setSourceUrl('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-100">
                Flag Viral Misinformation
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Automated Incident Intake & OSINT Triage
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {successReport ? (
          /* Submission Confirmation Card */
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Incident Successfully Filed & Queued</span>
              </div>
              <p className="text-slate-300">
                Incident Report <strong className="font-mono text-emerald-400">{successReport.id}</strong> has been logged to the public TRACE Registry.
              </p>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-300 space-y-1">
                <div><strong>Claim:</strong> {successReport.claim}</div>
                <div><strong>Platform:</strong> {successReport.platform}</div>
                <div><strong>Severity:</strong> {successReport.severity}</div>
                <div><strong>Status:</strong> {successReport.status}</div>
                <div><strong>Takedown Action:</strong> {successReport.takedownStatus}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Report Submission Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-200 block">
                Misleading Claim / Headline *
              </label>
              <textarea
                required
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                placeholder="e.g. Instagram reel claiming China and Europe declared World War 3 and troops are mobilizing..."
                rows={3}
                className="w-full text-xs rounded-xl bg-slate-950 border border-slate-800 p-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-200 block">
                  Platform Encountered
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="w-full text-xs rounded-lg bg-slate-950 border border-slate-800 p-2.5 text-slate-200 focus:outline-none focus:border-rose-500"
                >
                  <option value="Instagram">Instagram (Reels / Stories)</option>
                  <option value="TikTok">TikTok (Viral Video / AI Voice)</option>
                  <option value="X/Twitter">X / Twitter</option>
                  <option value="Facebook">Facebook (Groups / Watch)</option>
                  <option value="WhatsApp">WhatsApp (Forwarded Chain)</option>
                  <option value="YouTube">YouTube (Shorts)</option>
                  <option value="Web Article">Web Article / Blog</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-200 block">
                  Incident Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs rounded-lg bg-slate-950 border border-slate-800 p-2.5 text-slate-200 focus:outline-none focus:border-rose-500"
                >
                  <option value="War/Geopolitics">War & Geopolitical Panic</option>
                  <option value="AI Deepfake">AI Deepfake & Voice Clone</option>
                  <option value="Health/Disaster">Disaster & Grid Failure</option>
                  <option value="Elections">Electoral Disinformation</option>
                  <option value="Financial Scams">Financial & Bank Runs</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-200 block">
                Post URL (Optional)
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://instagram.com/reel/... or https://tiktok.com/..."
                className="w-full text-xs rounded-lg bg-slate-950 border border-slate-800 p-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-200 block">
                Severity Level
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSeverity(lvl)}
                    className={`py-1.5 rounded-lg border text-center font-bold transition-all ${
                      severity === lvl
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-200 block">
                Context / Forensic Observations (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Note any synthesized robotic voices, recycled military drills from 2018, fake emergency logos, etc."
                rows={2}
                className="w-full text-xs rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* CTAs */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !claim.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-rose-600/20 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting Report...</span>
                  </>
                ) : (
                  <>
                    <Flag className="w-3.5 h-3.5" />
                    <span>Dispatch Incident Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
