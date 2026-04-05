'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────
type LeadStatus = 'new' | 'contacted' | 'warm' | 'hot' | 'booked' | 'closed' | 'cold';

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: LeadStatus;
  score: number;
  lastContact: string;
  nextFollowUp: string;
  touchpoints: number;
  maxTouchpoints: number;
  notes: string;
  responseTime?: string;
}

interface FollowUpTemplate {
  touchpoint: number;
  delay: string;
  channel: string;
  subject: string;
  approach: string;
}

// ─── Data ─────────────────────────────────────────────────────
const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@techstartup.io', source: 'AI Audit Lead Magnet', status: 'hot', score: 24, lastContact: '2 hours ago', nextFollowUp: 'Today 3pm', touchpoints: 4, maxTouchpoints: 7, notes: 'Runs a 15-person SaaS. Wants sales automation badly. Demo booked.', responseTime: '34s' },
  { id: '2', name: 'Marcus Johnson', email: 'marcus@growthagency.com', source: 'YouTube Comment', status: 'warm', score: 15, lastContact: '1 day ago', nextFollowUp: 'Tomorrow 10am', touchpoints: 3, maxTouchpoints: 7, notes: 'Agency owner, 50+ clients. Interested in white-label automation.' },
  { id: '3', name: 'Emily Rodriguez', email: 'emily@fitnessbrand.co', source: 'Dream 100 Outreach', status: 'contacted', score: 8, lastContact: '3 days ago', nextFollowUp: 'Friday', touchpoints: 2, maxTouchpoints: 7, notes: 'Fitness brand, 200K followers. Needs content repurposing.' },
  { id: '4', name: 'David Kim', email: 'david@realestate.com', source: '4-Day Cash Machine', status: 'booked', score: 28, lastContact: '5 hours ago', nextFollowUp: 'Call tomorrow 2pm', touchpoints: 5, maxTouchpoints: 7, notes: 'Real estate team, 12 agents. Wants full lead gen automation.', responseTime: '12s' },
  { id: '5', name: 'Lisa Park', email: 'lisa@ecom.store', source: 'Referral', status: 'new', score: 5, lastContact: 'Never', nextFollowUp: 'ASAP (<60s)', touchpoints: 0, maxTouchpoints: 7, notes: 'E-commerce brand, $2M/yr. Referred by David Kim.' },
  { id: '6', name: 'Tom Wright', email: 'tom@consulting.co', source: 'LinkedIn DM', status: 'cold', score: 3, lastContact: '30 days ago', nextFollowUp: 'Final attempt', touchpoints: 6, maxTouchpoints: 7, notes: 'Went dark after Day 2 email. One more try.' },
];

const FRO_SEQUENCE: FollowUpTemplate[] = [
  { touchpoint: 1, delay: '<60 seconds', channel: 'AI Chat + Email', subject: 'Instant response to inquiry', approach: 'Speed to Lead — AI bot qualifies immediately, sends personalized welcome email' },
  { touchpoint: 2, delay: '1 hour', channel: 'SMS', subject: 'Quick personal note', approach: 'Relevance — reference their specific pain point from the form/chat' },
  { touchpoint: 3, delay: '24 hours', channel: 'Email', subject: 'Here\'s what I found for you...', approach: 'Results In Advance — send a mini-audit or relevant case study' },
  { touchpoint: 4, delay: '3 days', channel: 'Video (Loom)', subject: 'I recorded this just for you', approach: 'Originality — personal video walkthrough of their specific situation' },
  { touchpoint: 5, delay: '7 days', channel: 'Email + Social', subject: 'Client just got these results...', approach: 'Social proof — share a relevant success story + engage on their social' },
  { touchpoint: 6, delay: '14 days', channel: 'Email', subject: 'Is this still a priority?', approach: 'Re-engagement — acknowledge time has passed, offer new angle' },
  { touchpoint: 7, delay: '30 days', channel: 'Email', subject: 'Last one from me (unless...)', approach: 'Breakup email — create urgency by being willing to walk away' },
];

// ─── Helpers ──────────────────────────────────────────────────
function statusConfig(status: LeadStatus): { color: string; bg: string; label: string } {
  const map: Record<LeadStatus, { color: string; bg: string; label: string }> = {
    new: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30', label: 'NEW' },
    contacted: { color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30', label: 'CONTACTED' },
    warm: { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', label: 'WARM' },
    hot: { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', label: 'HOT' },
    booked: { color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30', label: 'BOOKED' },
    closed: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', label: 'CLOSED' },
    cold: { color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-500/30', label: 'COLD' },
  };
  return map[status];
}

export default function FRODashboard() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');
  const [view, setView] = useState<'leads' | 'sequence'>('leads');

  const selected = leads.find(l => l.id === selectedLead);
  const filtered = filterStatus === 'all' ? leads : leads.filter(l => l.status === filterStatus);
  const statuses: (LeadStatus | 'all')[] = ['all', 'new', 'contacted', 'warm', 'hot', 'booked', 'closed', 'cold'];

  // KPIs
  const avgResponseTime = leads.filter(l => l.responseTime).length > 0
    ? leads.filter(l => l.responseTime).map(l => parseInt(l.responseTime!)).reduce((a, b) => a + b, 0) / leads.filter(l => l.responseTime).length
    : 0;
  const hotLeads = leads.filter(l => l.status === 'hot' || l.status === 'booked').length;
  const avgTouchpoints = (leads.reduce((sum, l) => sum + l.touchpoints, 0) / leads.length).toFixed(1);

  function updateLeadStatus(id: string, status: LeadStatus) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  }

  return (
    <div className="text-white space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            FRO Follow-Up Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">Ryan Serhant's Follow-up, Relevance, Originality — automated</p>
        </div>
        <div className="flex gap-1">
          {(['leads', 'sequence'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                view === v ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {v === 'leads' ? 'Lead Pipeline' : 'FRO Sequence'}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-purple-400">{leads.length}</p>
          <p className="text-xs text-gray-500">Total Leads</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-orange-400">{hotLeads}</p>
          <p className="text-xs text-gray-500">Hot / Booked</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-green-500/30 text-center">
          <p className={`text-2xl font-bold ${avgResponseTime <= 60 ? 'text-green-400' : 'text-red-400'}`}>
            {avgResponseTime > 0 ? `${Math.round(avgResponseTime)}s` : '—'}
          </p>
          <p className="text-xs text-gray-500">Avg Response Time</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-blue-400">{avgTouchpoints}</p>
          <p className="text-xs text-gray-500">Avg Touchpoints</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-yellow-400">7</p>
          <p className="text-xs text-gray-500">Max Before Cold</p>
        </div>
      </div>

      {view === 'leads' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lead List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-1">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-2 py-1 rounded text-xs transition ${
                    filterStatus === s ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {s === 'all' ? 'All' : s.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Lead Cards */}
            <div className="space-y-2">
              {filtered.map(lead => {
                const sc = statusConfig(lead.status);
                return (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(selectedLead === lead.id ? null : lead.id)}
                    className={`w-full text-left p-4 rounded-xl border bg-gray-900 transition hover:shadow-lg ${
                      selectedLead === lead.id ? 'ring-2 ring-purple-500 border-purple-500/30' : 'border-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${lead.status === 'new' ? 'bg-blue-400 animate-pulse' : lead.status === 'hot' ? 'bg-orange-400 animate-pulse' : sc.color.replace('text-', 'bg-')}`} />
                        <h3 className="text-sm font-bold text-white">{lead.name}</h3>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${sc.bg}`}>{sc.label}</span>
                      </div>
                      <span className={`text-lg font-bold ${lead.score >= 20 ? 'text-green-400' : lead.score >= 10 ? 'text-yellow-400' : 'text-gray-500'}`}>
                        {lead.score}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{lead.source}</span>
                      <span>Touch {lead.touchpoints}/{lead.maxTouchpoints}</span>
                      <span>Next: {lead.nextFollowUp}</span>
                      {lead.responseTime && (
                        <span className={`font-mono ${parseInt(lead.responseTime) <= 60 ? 'text-green-400' : 'text-red-400'}`}>
                          Speed: {lead.responseTime}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="space-y-4">
            {selected ? (
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 sticky top-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${statusConfig(selected.status).color.replace('text-', 'bg-')}`} />
                  <div>
                    <h2 className="text-lg font-bold">{selected.name}</h2>
                    <p className="text-xs text-gray-500">{selected.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Status</p>
                    <select
                      value={selected.status}
                      onChange={e => updateLeadStatus(selected.id, e.target.value as LeadStatus)}
                      className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      {(['new', 'contacted', 'warm', 'hot', 'booked', 'closed', 'cold'] as LeadStatus[]).map(s => (
                        <option key={s} value={s}>{s.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Lead Score</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-800 rounded-full h-2">
                        <div className={`h-2 rounded-full ${selected.score >= 20 ? 'bg-green-500' : selected.score >= 10 ? 'bg-yellow-500' : 'bg-gray-500'}`} style={{ width: `${Math.min((selected.score / 30) * 100, 100)}%` }} />
                      </div>
                      <span className="text-sm font-bold">{selected.score}/30</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Touchpoints</p>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: selected.maxTouchpoints }).map((_, i) => (
                        <div key={i} className={`flex-1 h-2 rounded-full ${i < selected.touchpoints ? 'bg-purple-500' : 'bg-gray-700'}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">{selected.touchpoints} of {selected.maxTouchpoints} before marking cold</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Source</p>
                    <p className="text-sm text-gray-300 mt-1">{selected.source}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Notes</p>
                    <p className="text-xs text-gray-400 mt-1">{selected.notes}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">Last Contact</p>
                      <p className="text-xs text-gray-300">{selected.lastContact}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">Next Follow-Up</p>
                      <p className="text-xs text-yellow-400 font-medium">{selected.nextFollowUp}</p>
                    </div>
                  </div>

                  {selected.responseTime && (
                    <div className={`p-2 rounded-lg ${parseInt(selected.responseTime) <= 60 ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                      <p className="text-[10px] text-gray-500">Speed to Lead</p>
                      <p className={`text-lg font-bold font-mono ${parseInt(selected.responseTime) <= 60 ? 'text-green-400' : 'text-red-400'}`}>
                        {selected.responseTime}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 text-center">
                <p className="text-gray-500 text-sm">Select a lead to inspect</p>
              </div>
            )}

            {/* Serhant Quote */}
            <div className="bg-gray-900 rounded-xl border border-purple-500/20 p-4">
              <p className="text-xs text-purple-400 italic leading-relaxed">
                "The fortune is in the follow-up. But only if it's relevant and original."
              </p>
              <p className="text-[10px] text-gray-600 mt-2">— Ryan Serhant</p>
            </div>
          </div>
        </div>
      )}

      {/* FRO Sequence View */}
      {view === 'sequence' && (
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-xl border border-purple-500/30 p-5 mb-4">
            <h2 className="text-sm font-bold text-purple-400 mb-2">The FRO Framework</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <h3 className="text-sm font-bold text-white">Follow-up</h3>
                <p className="text-xs text-gray-400 mt-1">7 touches before marking cold. Each references the previous interaction. Never let a lead slip.</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <h3 className="text-sm font-bold text-white">Relevance</h3>
                <p className="text-xs text-gray-400 mt-1">Every message is contextual. AI scans their activity, adjusts messaging. No generic blasts.</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <h3 className="text-sm font-bold text-white">Originality</h3>
                <p className="text-xs text-gray-400 mt-1">Never send the same template twice. Mix media: text, video, voice note, case study, meme.</p>
              </div>
            </div>
          </div>

          {FRO_SEQUENCE.map(step => (
            <div key={step.touchpoint} className="bg-gray-900 rounded-xl border border-gray-800 p-5 flex gap-6">
              <div className="text-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">
                  {step.touchpoint}
                </div>
                <p className="text-[10px] text-gray-500 mt-1">{step.delay}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-white">{step.subject}</h3>
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 rounded text-gray-500">{step.channel}</span>
                </div>
                <p className="text-xs text-gray-400">{step.approach}</p>
              </div>
            </div>
          ))}

          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
            <p className="text-xs text-red-400 font-mono">
              SPEED TO LEAD TARGET: &lt;60 seconds. First responder wins disproportionately. AI handles initial contact, routes hot leads to calendar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
