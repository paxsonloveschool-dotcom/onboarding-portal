'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────
interface Influence {
  name: string;
  framework: string;
  principle: string;
  color: string;
  borderColor: string;
  tactics: string[];
  agentMapping: string;
}

interface SwarmNode {
  name: string;
  emoji: string;
  agents: { name: string; role: string }[];
}

interface Phase {
  name: string;
  week: string;
  tasks: string[];
  agentsNeeded: number;
  status: 'complete' | 'active' | 'upcoming';
}

// ─── Data ─────────────────────────────────────────────────────
const INFLUENCES: Influence[] = [
  {
    name: 'Alex Hormozi',
    framework: '$100M Offers + Value Equation',
    principle: 'Make offers so good people feel stupid saying no',
    color: 'text-red-400',
    borderColor: 'border-red-500/30',
    tactics: [
      'Value = (Dream Outcome x Likelihood) / (Time x Effort)',
      'Grand Slam Offer: stack components to 5-10x perceived value',
      'Price on outcomes, not inputs',
      'Lead magnets as complete solutions (give away "what", sell "how")',
      'Starving crowd > compelling offer > good copy',
    ],
    agentMapping: 'Offer Agent — assembles Grand Slam Offers, calculates value stacks, outcome-based pricing',
  },
  {
    name: 'Jeremy Miner',
    framework: 'NEPQ (Neuro-Emotional Persuasion Questions)',
    principle: 'Questions over pitches. Let prospects sell themselves.',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    tactics: [
      'Stage 1: Situation questions (understand current state)',
      'Stage 2: Problem Awareness (surface tolerated pain)',
      'Stage 3: Solution Awareness (paint the possibility)',
      'Stage 4: Consequence (emotional weight of NOT acting)',
      'Stage 5: Commitment + Disqualification frame',
    ],
    agentMapping: 'NEPQ Sales Bot — runs 5-stage question sequences in chat/voice, adapts tonality per stage',
  },
  {
    name: 'Russell Brunson',
    framework: 'Sales Funnels + Secrets Trilogy',
    principle: 'Value Ladder ascension. Every page: Hook, Story, Offer.',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    tactics: [
      'Value Ladder: Free → Tripwire ($27) → Core ($997) → High-ticket ($5K+)',
      'Hook-Story-Offer on every page',
      'Epiphany Bridge: share your discovery story',
      'Attractive Character archetype (Leader/Adventurer/Reporter/Reluctant Hero)',
      'Dream 100: find where your audience already lives',
    ],
    agentMapping: 'Funnel Agent — builds value ladder pages, writes Hook-Story-Offer copy, manages Dream 100 list',
  },
  {
    name: 'Frank Kern',
    framework: 'Intent-Based Branding + Results In Advance',
    principle: 'Give a real result first. Behavior reveals intent.',
    color: 'text-green-400',
    borderColor: 'border-green-500/30',
    tactics: [
      'Results In Advance: deliver value before asking for money',
      'Intent-Based Branding: every ad = direct response + brand',
      '4-Day Cash Machine: Story → Content → Offer → Urgency',
      'Behavioral Dynamic Response: segment by actions, not demographics',
      'Omnipresence: retarget everywhere they look',
    ],
    agentMapping: 'Campaign Agent — runs 4-Day Cash Machine sequences, behavioral triggers, omnipresence retargeting',
  },
  {
    name: 'Ryan Serhant',
    framework: 'FRO + Speed to Lead',
    principle: 'Follow-up, Relevance, Originality. First responder wins.',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    tactics: [
      'FRO: Follow-up (7x before cold), Relevance (context-aware), Originality (never same template)',
      'Speed to Lead: respond in <60 seconds',
      'Expansion selling: upsell, cross-sell, referral from every deal',
      '1000-Watt Personality: every touchpoint = sales opportunity',
      'Prepared confidence: know every detail',
    ],
    agentMapping: 'FRO Follow-Up Agent — instant response, dynamic sequences, never repeats a template',
  },
  {
    name: 'Nate Herk',
    framework: 'Agent Swarms + OpenClaw + Claude Code',
    principle: 'Multi-agent orchestration. Claude Code as the engine.',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    tactics: [
      'Agent swarms: specialized AI agents per task, not one monolithic prompt',
      'Claude Code CLI as senior developer pair',
      'OpenClaw: open-source tooling for agent management',
      'CLAUDE.md as the operating system (GOD MODE v2)',
      'End-to-end automation pipelines (not just chat)',
    ],
    agentMapping: 'The entire GOD MODE v2 Build Swarm — orchestrator + implementers + reviewers + researchers',
  },
];

const SWARM_ARCHITECTURE: SwarmNode[] = [
  {
    name: 'Business Intelligence',
    emoji: '📊',
    agents: [
      { name: 'Market Researcher', role: 'Niche analysis, competitor scanning' },
      { name: 'Analytics Agent', role: 'KPI tracking, report generation' },
      { name: 'Dream 100 Agent', role: 'Influencer monitoring + engagement' },
    ],
  },
  {
    name: 'Sales',
    emoji: '💰',
    agents: [
      { name: 'NEPQ Sales Bot', role: 'Miner 5-stage qualification conversations' },
      { name: 'Lead Scorer', role: 'Rate and route leads (1-10)' },
      { name: 'Calendar Agent', role: 'Book qualified prospects' },
      { name: 'FRO Follow-Up', role: 'Serhant-style sequences' },
    ],
  },
  {
    name: 'Content',
    emoji: '🎨',
    agents: [
      { name: 'Copywriter', role: 'Hook-Story-Offer for all content' },
      { name: 'Video Script', role: 'YouTube, Reels, Shorts scripts' },
      { name: 'Repurposer', role: '1 video → 30 pieces of content' },
      { name: 'Social Agent', role: 'Post, engage, monitor mentions' },
    ],
  },
  {
    name: 'Build (GOD MODE)',
    emoji: '🏗️',
    agents: [
      { name: 'Implementers', role: 'TDD, pattern-matched code' },
      { name: 'Spec Reviewers', role: 'Binary PASS/FAIL on requirements' },
      { name: 'Quality Reviewers', role: 'Code quality classification' },
      { name: 'Researchers', role: 'Codebase + GitHub + design patterns' },
    ],
  },
  {
    name: 'Campaigns',
    emoji: '📬',
    agents: [
      { name: 'Email Agent', role: 'Drip sequences, 4-Day Cash Machine' },
      { name: 'SMS Agent', role: 'Time-sensitive triggers' },
      { name: 'Retargeting', role: 'Kern omnipresence ad management' },
      { name: 'Offer Agent', role: 'Grand Slam Offer assembly + pricing' },
    ],
  },
  {
    name: 'Operations',
    emoji: '🛡️',
    agents: [
      { name: 'Dashboard', role: 'Real-time metrics and alerts' },
      { name: 'Security', role: 'Monitor for issues' },
      { name: 'Billing', role: 'Invoicing, payment tracking' },
      { name: 'Onboarding', role: 'New client setup automation' },
    ],
  },
];

const PHASES: Phase[] = [
  { name: 'Foundation', week: 'Week 1', tasks: ['Next.js app + auth + DB + CRM', 'Configure GOD MODE v2 CLAUDE.md', 'Build swarm dashboard', 'Set up MCP servers'], agentsNeeded: 4, status: 'complete' },
  { name: 'Offer + Funnel', week: 'Week 2', tasks: ['Landing page (Hook-Story-Offer)', 'Lead magnet (Results In Advance)', 'Value Ladder pages', 'Payment + checkout'], agentsNeeded: 6, status: 'active' },
  { name: 'Sales Engine', week: 'Week 3', tasks: ['NEPQ sales chatbot', 'Lead scoring system', 'FRO follow-up sequences', 'Calendar booking', 'Behavioral triggers'], agentsNeeded: 8, status: 'upcoming' },
  { name: 'Content + Marketing', week: 'Week 4', tasks: ['Content repurposing pipeline', 'Dream 100 monitoring', '4-Day Cash Machine templates', 'Social automation', 'Retargeting'], agentsNeeded: 7, status: 'upcoming' },
  { name: 'Scale + Optimize', week: 'Ongoing', tasks: ['A/B test offer variations', 'Optimize NEPQ sequences', 'Expand Dream 100', 'Performance tuning'], agentsNeeded: 0, status: 'upcoming' },
];

const VALUE_EQUATION = {
  numerator: [
    { label: 'Dream Outcome', description: 'AI delivers the full result, not just tools', icon: '🎯', boost: 'MAXIMIZE' },
    { label: 'Perceived Likelihood', description: '"Results in Advance" proves competence', icon: '📈', boost: 'MAXIMIZE' },
  ],
  denominator: [
    { label: 'Time Delay', description: 'Agent swarm builds in hours, not weeks', icon: '⚡', boost: 'MINIMIZE' },
    { label: 'Effort & Sacrifice', description: 'Client does nothing — agents handle everything', icon: '🛋️', boost: 'MINIMIZE' },
  ],
};

// ─── Component ────────────────────────────────────────────────
export default function PlaybookPage() {
  const [activeSection, setActiveSection] = useState<'overview' | 'influences' | 'swarm' | 'phases' | 'value'>('overview');

  const sections = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'influences' as const, label: 'Influences (6)' },
    { id: 'value' as const, label: 'Value Equation' },
    { id: 'swarm' as const, label: 'Full Swarm' },
    { id: 'phases' as const, label: 'Implementation' },
  ];

  const totalAgents = SWARM_ARCHITECTURE.reduce((sum, s) => sum + s.agents.length, 0);

  return (
    <div className="text-white space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
          The Playbook
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          AI Business Automation OS — 6 Influences, {totalAgents} Agents, 5 Phases
        </p>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-1">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
              activeSection === s.id ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ─── OVERVIEW ─── */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Stack Diagram */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-400 mb-3">The Stack</h2>
            {[
              { layer: 'DEPLOYMENT', desc: 'Auto-deploy pipelines', color: 'border-gray-500/30' },
              { layer: 'AGENT SWARM', desc: 'GOD MODE v2 — Orchestrator + 36 skills', color: 'border-purple-500/30' },
              { layer: 'AI SALES ENGINE', desc: 'NEPQ bot, lead scoring, behavioral triggers', color: 'border-blue-500/30' },
              { layer: 'FUNNEL SYSTEM', desc: 'Value Ladder, Hook-Story-Offer, 4-Day Machine', color: 'border-yellow-500/30' },
              { layer: 'OFFER ARCHITECTURE', desc: 'Grand Slam Offers, Value Equation pricing', color: 'border-red-500/30' },
              { layer: 'FOUNDATION', desc: 'Next.js, database, auth, CRM', color: 'border-green-500/30' },
            ].map((l, i) => (
              <div key={l.layer} className={`bg-gray-900 border rounded-lg p-4 ${l.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 font-mono w-8">L{6 - i}</span>
                    <h3 className="text-sm font-bold">{l.layer}</h3>
                  </div>
                  <p className="text-xs text-gray-500">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
              <p className="text-3xl font-bold text-amber-400">6</p>
              <p className="text-xs text-gray-500 mt-1">Influences</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
              <p className="text-3xl font-bold text-purple-400">{totalAgents}</p>
              <p className="text-xs text-gray-500 mt-1">Total Agents</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
              <p className="text-3xl font-bold text-blue-400">6</p>
              <p className="text-xs text-gray-500 mt-1">Agent Swarms</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
              <p className="text-3xl font-bold text-green-400">5</p>
              <p className="text-xs text-gray-500 mt-1">Phases</p>
            </div>
          </div>

          {/* Influence → Agent Mapping */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 mb-3">Influence → Agent Mapping</h2>
            <div className="space-y-2">
              {INFLUENCES.map(inf => (
                <div key={inf.name} className={`bg-gray-900 rounded-lg border p-3 flex items-center gap-4 ${inf.borderColor}`}>
                  <div className="w-32 shrink-0">
                    <span className={`text-sm font-bold ${inf.color}`}>{inf.name}</span>
                  </div>
                  <div className="text-gray-600 shrink-0">→</div>
                  <p className="text-xs text-gray-400">{inf.agentMapping}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── INFLUENCES ─── */}
      {activeSection === 'influences' && (
        <div className="space-y-4">
          {INFLUENCES.map(inf => (
            <div key={inf.name} className={`bg-gray-900 rounded-xl border p-6 ${inf.borderColor}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className={`text-lg font-bold ${inf.color}`}>{inf.name}</h2>
                  <p className="text-sm text-gray-500 font-mono">{inf.framework}</p>
                </div>
              </div>

              <div className="p-3 bg-gray-800/50 rounded-lg mb-4">
                <p className="text-sm text-gray-300 italic">"{inf.principle}"</p>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Key Tactics:</p>
                <ul className="space-y-1.5">
                  {inf.tactics.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className={`mt-0.5 ${inf.color}`}>&#9656;</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                <p className="text-[10px] text-purple-400 font-mono">AGENT: {inf.agentMapping}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── VALUE EQUATION ─── */}
      {activeSection === 'value' && (
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl border border-red-500/30 p-6 text-center">
            <h2 className="text-lg font-bold text-red-400 mb-2">Hormozi Value Equation</h2>
            <p className="text-2xl font-mono text-white">
              Value = <span className="text-green-400">(Dream Outcome x Likelihood)</span> / <span className="text-red-400">(Time x Effort)</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-3">MAXIMIZE (Numerator)</h3>
              <div className="space-y-3">
                {VALUE_EQUATION.numerator.map(v => (
                  <div key={v.label} className="bg-gray-900 rounded-lg border border-green-500/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{v.icon}</span>
                      <h4 className="font-bold text-white">{v.label}</h4>
                      <span className="ml-auto text-[10px] px-2 py-0.5 bg-green-500/10 rounded text-green-400 font-mono">{v.boost}</span>
                    </div>
                    <p className="text-xs text-gray-400">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-3">MINIMIZE (Denominator)</h3>
              <div className="space-y-3">
                {VALUE_EQUATION.denominator.map(v => (
                  <div key={v.label} className="bg-gray-900 rounded-lg border border-red-500/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{v.icon}</span>
                      <h4 className="font-bold text-white">{v.label}</h4>
                      <span className="ml-auto text-[10px] px-2 py-0.5 bg-red-500/10 rounded text-red-400 font-mono">{v.boost}</span>
                    </div>
                    <p className="text-xs text-gray-400">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grand Slam Offer Example */}
          <div className="bg-gray-900 rounded-xl border border-yellow-500/30 p-6">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Grand Slam Offer Template</h3>
            <div className="space-y-3">
              {[
                { component: 'AI Sales Agent', desc: 'NEPQ-trained chatbot, 24/7 qualification', value: '$15,000' },
                { component: 'Automated Funnel', desc: 'Full value ladder, lead magnet to high-ticket', value: '$10,000' },
                { component: 'Follow-Up Engine', desc: 'Behavioral FRO sequences (email + SMS)', value: '$5,000' },
                { component: 'Content Pipeline', desc: '1 video → 30 pieces across all platforms', value: '$8,000' },
                { component: 'Live Dashboard', desc: 'Real-time metrics, lead flow, revenue', value: '$3,000' },
              ].map(c => (
                <div key={c.component} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                  <div>
                    <span className="text-sm font-semibold text-white">{c.component}</span>
                    <p className="text-xs text-gray-500">{c.desc}</p>
                  </div>
                  <span className="text-sm font-mono text-gray-400">{c.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t-2 border-yellow-500/30">
                <span className="text-sm text-gray-500">Total Stacked Value</span>
                <span className="text-lg font-bold text-yellow-400">$41,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Your Price</span>
                <span className="text-2xl font-bold text-green-400">$5,000</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── FULL SWARM ─── */}
      {activeSection === 'swarm' && (
        <div className="space-y-4">
          {/* Master Orchestrator */}
          <div className="bg-gray-900 rounded-xl border border-purple-500/30 p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h2 className="text-lg font-bold text-purple-400">Master Orchestrator</h2>
                <p className="text-xs text-gray-500">Coordinates all 6 swarms, {totalAgents} agents</p>
              </div>
            </div>
          </div>

          {/* Swarm Nodes */}
          <div className="grid md:grid-cols-2 gap-4">
            {SWARM_ARCHITECTURE.map(swarm => (
              <div key={swarm.name} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{swarm.emoji}</span>
                  <h3 className="font-bold text-white">{swarm.name} Swarm</h3>
                  <span className="ml-auto text-xs text-gray-600">{swarm.agents.length} agents</span>
                </div>
                <div className="space-y-2">
                  {swarm.agents.map(agent => (
                    <div key={agent.name} className="flex items-start gap-3 p-2 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-600 mt-0.5">&#9500;</span>
                      <div>
                        <span className="text-sm font-semibold text-gray-300">{agent.name}</span>
                        <p className="text-[10px] text-gray-500">{agent.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Agent Count */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              1 Orchestrator + {totalAgents} Agents = Your Entire Business on Autopilot
            </p>
          </div>
        </div>
      )}

      {/* ─── IMPLEMENTATION PHASES ─── */}
      {activeSection === 'phases' && (
        <div className="space-y-4">
          {PHASES.map((phase, i) => (
            <div key={phase.name} className={`bg-gray-900 rounded-xl border p-5 ${
              phase.status === 'complete' ? 'border-green-500/30' :
              phase.status === 'active' ? 'border-yellow-500/30' :
              'border-gray-800'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${
                    phase.status === 'complete' ? 'bg-green-500' :
                    phase.status === 'active' ? 'bg-yellow-400 animate-pulse' :
                    'bg-gray-600'
                  }`} />
                  <div>
                    <h3 className="font-bold text-white">Phase {i + 1}: {phase.name}</h3>
                    <p className="text-xs text-gray-500">{phase.week}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {phase.agentsNeeded > 0 && (
                    <span className="text-xs text-gray-500">{phase.agentsNeeded} agents</span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    phase.status === 'complete' ? 'bg-green-500/10 text-green-400' :
                    phase.status === 'active' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-gray-800 text-gray-500'
                  }`}>
                    {phase.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {phase.tasks.map((task, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs">
                    <span className={
                      phase.status === 'complete' ? 'text-green-500' :
                      phase.status === 'active' && j === 0 ? 'text-yellow-400' :
                      'text-gray-600'
                    }>
                      {phase.status === 'complete' ? '✓' : '○'}
                    </span>
                    <span className="text-gray-400">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
