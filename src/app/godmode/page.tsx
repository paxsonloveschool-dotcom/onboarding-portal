'use client';

import { useState } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────
type StageStatus = 'idle' | 'active' | 'complete' | 'skipped' | 'blocked';

interface Stage {
  id: string;
  name: string;
  description: string;
  source: string;
  status: StageStatus;
  skills: string[];
  primeDirective: string;
}

interface Skill {
  name: string;
  category: string;
  description: string;
  source: string;
}

// ─── Data ─────────────────────────────────────────────────────
const PIPELINE_STAGES: Stage[] = [
  {
    id: 'rationale',
    name: 'Rationale',
    description: 'Challenge whether the work is worth doing. 5-point analysis.',
    source: 'GOD MODE',
    status: 'idle',
    skills: ['rationale', 'reference-engine', 'github-search'],
    primeDirective: 'NO WORK WITHOUT QUESTIONING WHETHER THE WORK IS WORTH DOING',
  },
  {
    id: 'intent-discovery',
    name: 'Intent Discovery',
    description: 'Explore requirements via Socratic refinement. Design before code.',
    source: 'GOD MODE + Superpowers',
    status: 'idle',
    skills: ['intent-discovery', 'specification-first'],
    primeDirective: 'NO IMPLEMENTATION WITHOUT A VALIDATED DESIGN FIRST',
  },
  {
    id: 'references',
    name: 'References',
    description: 'Search for proven solutions before designing from scratch.',
    source: 'GOD MODE',
    status: 'idle',
    skills: ['reference-engine', 'codebase-research', 'design-research', 'github-search'],
    primeDirective: 'NO BUILDING WITHOUT A REFERENCE',
  },
  {
    id: 'design',
    name: 'Design',
    description: 'UI engineering, design tokens, UX patterns, system design.',
    source: 'GOD MODE + claude-code-skills',
    status: 'idle',
    skills: ['ui-engineering', 'design-integration', 'ux-patterns', 'system-design'],
    primeDirective: 'NO UI CODE WITHOUT UX REFERENCE FIRST',
  },
  {
    id: 'plan-review',
    name: 'Plan Review Gate',
    description: 'Validate plan: feasibility, completeness, scope alignment.',
    source: 'Metaswarm',
    status: 'idle',
    skills: ['task-planning', 'task-runner'],
    primeDirective: 'NO PLAN PRESENTED WITHOUT 3-DIMENSION VALIDATION',
  },
  {
    id: 'implementation',
    name: 'Implementation',
    description: 'Test-first development. RED → GREEN → REFACTOR. Pattern matching.',
    source: 'GOD MODE + Superpowers',
    status: 'idle',
    skills: ['test-first', 'pattern-matching', 'environment-awareness', 'project-bootstrap'],
    primeDirective: 'NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST',
  },
  {
    id: 'quality-gate',
    name: 'Quality Gate',
    description: 'Type checking, linting, tests, security, coverage — with evidence.',
    source: 'GOD MODE + Superpowers + Metaswarm',
    status: 'idle',
    skills: ['quality-enforcement', 'security-protocol', 'completion-gate', 'comprehension-check'],
    primeDirective: 'NO COMPLETION ASSERTIONS WITHOUT FRESH VERIFICATION OUTPUT',
  },
  {
    id: 'self-reflect',
    name: 'Self-Reflect',
    description: 'Extract learnings, capture patterns, promote to rules.',
    source: 'Metaswarm',
    status: 'idle',
    skills: ['knowledge-capture', 'error-recovery'],
    primeDirective: 'EVERY INTERACTION PRODUCES KNOWLEDGE',
  },
  {
    id: 'merge',
    name: 'Merge & Deploy',
    description: 'All checks pass → merge/PR/keep/discard.',
    source: 'GOD MODE + Superpowers',
    status: 'idle',
    skills: ['merge-protocol', 'deployment-advisor', 'performance-tuning'],
    primeDirective: 'NO CODE LANDS WITHOUT ALL QUALITY CHECKS PASSING',
  },
];

const ALL_SKILLS: Skill[] = [
  // Core Workflow
  { name: 'activation', category: 'Core Workflow', description: 'Auto-trigger skills before any response', source: 'GOD MODE' },
  { name: 'rationale', category: 'Core Workflow', description: '5-point analysis before building', source: 'GOD MODE' },
  { name: 'intent-discovery', category: 'Core Workflow', description: 'Socratic design refinement', source: 'GOD MODE + Superpowers' },
  { name: 'task-planning', category: 'Core Workflow', description: 'Bite-sized task decomposition', source: 'GOD MODE' },
  { name: 'task-runner', category: 'Core Workflow', description: 'Batch execution with checkpoints', source: 'GOD MODE' },
  { name: 'completion-gate', category: 'Core Workflow', description: 'Evidence before claims', source: 'Superpowers' },
  // Execution
  { name: 'delegated-execution', category: 'Execution', description: '3-stage subagent pipeline', source: 'GOD MODE + Metaswarm' },
  { name: 'parallel-execution', category: 'Execution', description: 'Isolated concurrent tasks', source: 'GOD MODE' },
  { name: 'team-orchestration', category: 'Execution', description: 'Multi-agent collaboration', source: 'GOD MODE + Metaswarm' },
  { name: 'agent-messaging', category: 'Execution', description: 'Cross-agent communication', source: 'GOD MODE' },
  { name: 'workspace-isolation', category: 'Execution', description: 'Git worktree management', source: 'Superpowers' },
  // Quality
  { name: 'quality-gate', category: 'Quality', description: 'Pre-merge code review', source: 'GOD MODE' },
  { name: 'quality-enforcement', category: 'Quality', description: 'Lint + types + tests + build', source: 'GOD MODE + claude-code-skills' },
  { name: 'review-response', category: 'Quality', description: 'Technical feedback processing', source: 'GOD MODE' },
  { name: 'comprehension-check', category: 'Quality', description: 'Understand before commit', source: 'SuperClaude' },
  // Research
  { name: 'reference-engine', category: 'Research', description: 'Universal reference router', source: 'GOD MODE' },
  { name: 'github-search', category: 'Research', description: 'Open-source discovery', source: 'GOD MODE' },
  { name: 'codebase-research', category: 'Research', description: 'Internal pattern analysis', source: 'GOD MODE' },
  { name: 'design-research', category: 'Research', description: 'Template & UI research', source: 'GOD MODE' },
  // Dev Practices
  { name: 'test-first', category: 'Dev Practices', description: 'RED → GREEN → REFACTOR', source: 'GOD MODE + Superpowers' },
  { name: 'specification-first', category: 'Dev Practices', description: 'Spec before implementation', source: 'GOD MODE' },
  { name: 'fault-diagnosis', category: 'Dev Practices', description: '4-phase root cause analysis', source: 'GOD MODE + Superpowers' },
  { name: 'error-recovery', category: 'Dev Practices', description: 'Escalation ladder (Y→O→R)', source: 'Metaswarm + Superpowers' },
  { name: 'merge-protocol', category: 'Dev Practices', description: '4 merge options', source: 'GOD MODE + Superpowers' },
  { name: 'pattern-matching', category: 'Dev Practices', description: 'Mirror existing conventions', source: 'GOD MODE + Superpowers' },
  // Architecture
  { name: 'system-design', category: 'Architecture', description: 'Simplest-first architecture', source: 'GOD MODE' },
  { name: 'ui-engineering', category: 'Architecture', description: 'Semantic HTML + accessibility', source: 'GOD MODE' },
  { name: 'design-integration', category: 'Architecture', description: 'Design system consumption', source: 'claude-code-skills' },
  { name: 'ux-patterns', category: 'Architecture', description: 'Project-type UX patterns', source: 'GOD MODE' },
  // Infra
  { name: 'project-bootstrap', category: 'Infrastructure', description: 'New project scaffolding', source: 'GOD MODE' },
  { name: 'environment-awareness', category: 'Infrastructure', description: 'Runtime detection', source: 'GOD MODE' },
  { name: 'deployment-advisor', category: 'Infrastructure', description: 'Platform recommendation', source: 'GOD MODE' },
  { name: 'performance-tuning', category: 'Infrastructure', description: 'Measure-first optimization', source: 'GOD MODE' },
  { name: 'security-protocol', category: 'Infrastructure', description: 'OWASP + input validation', source: 'GOD MODE' },
  // Meta
  { name: 'knowledge-capture', category: 'Meta', description: 'Pattern extraction & promotion', source: 'Metaswarm' },
  { name: 'protocol-authoring', category: 'Meta', description: 'TDD for documentation', source: 'GOD MODE' },
];

const SOURCES = [
  { name: 'GOD MODE', repo: 'NoobyGains/godmode', color: 'bg-purple-500', skills: 36 },
  { name: 'Metaswarm', repo: 'dsifry/metaswarm', color: 'bg-blue-500', skills: 13 },
  { name: 'SuperClaude', repo: 'SuperClaude-Org/SuperClaude_Framework', color: 'bg-orange-500', skills: 20 },
  { name: 'Superpowers', repo: 'obra/superpowers', color: 'bg-green-500', skills: 11 },
  { name: 'claude-code-skills', repo: 'levnikolaevich/claude-code-skills', color: 'bg-red-500', skills: 129 },
];

const COGNITIVE_TRAPS = [
  { thought: '"This is too simple to need a test"', truth: 'Simple code breaks. Test takes 30 seconds.' },
  { thought: '"I\'ll test after implementing"', truth: 'Tests passing immediately prove nothing.' },
  { thought: '"The user asked for it, so build it"', truth: 'Users articulate desires, not validated needs.' },
  { thought: '"Should pass now"', truth: 'Fabrication signal. Run the command and prove it.' },
  { thought: '"Quick fix for now, investigate later"', truth: '"Later" means "never" or "at 10x the cost."' },
  { thought: '"One more fix attempt" (after 2+)', truth: "You're in a loop. STOP and reassess." },
];

// ─── Helpers ──────────────────────────────────────────────────
function statusColor(status: StageStatus): string {
  switch (status) {
    case 'active': return 'bg-yellow-400 animate-pulse';
    case 'complete': return 'bg-green-500';
    case 'skipped': return 'bg-gray-400';
    case 'blocked': return 'bg-red-500';
    default: return 'bg-gray-300';
  }
}

function statusBorder(status: StageStatus): string {
  switch (status) {
    case 'active': return 'border-yellow-400 shadow-yellow-400/20 shadow-lg';
    case 'complete': return 'border-green-500';
    case 'blocked': return 'border-red-500';
    default: return 'border-gray-200';
  }
}

// ─── Component ────────────────────────────────────────────────
export default function GodModeDashboard() {
  const [stages, setStages] = useState(PIPELINE_STAGES);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'skills' | 'sources' | 'traps'>('pipeline');
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(ALL_SKILLS.map(s => s.category)))];
  const filteredSkills = filterCategory === 'All' ? ALL_SKILLS : ALL_SKILLS.filter(s => s.category === filterCategory);

  function simulatePipeline() {
    const newStages = [...PIPELINE_STAGES.map(s => ({ ...s, status: 'idle' as StageStatus }))];
    setStages(newStages);
    setSelectedStage(null);

    newStages.forEach((_, i) => {
      setTimeout(() => {
        setStages(prev => prev.map((s, j) => ({
          ...s,
          status: j < i ? 'complete' : j === i ? 'active' : 'idle',
        })));
      }, (i + 1) * 800);
    });

    setTimeout(() => {
      setStages(prev => prev.map(s => ({ ...s, status: 'complete' })));
    }, (newStages.length + 1) * 800);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm">
              &larr; Portal
            </Link>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                GOD MODE v2
              </h1>
              <p className="text-xs text-gray-500">Ultimate Operating System &mdash; 5 Frameworks Synthesized</p>
            </div>
          </div>
          <button
            onClick={simulatePipeline}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition"
          >
            Simulate Pipeline
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-1 bg-gray-900 rounded-lg p-1 w-fit">
          {(['pipeline', 'skills', 'sources', 'traps'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab === 'pipeline' ? 'Pipeline' : tab === 'skills' ? `Skills (${ALL_SKILLS.length})` : tab === 'sources' ? 'Sources' : 'Cognitive Traps'}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ─── PIPELINE VIEW ─── */}
        {activeTab === 'pipeline' && (
          <div className="space-y-8">
            {/* Pipeline visualization */}
            <div className="relative">
              <div className="flex items-center gap-2 overflow-x-auto pb-4">
                {stages.map((stage, i) => (
                  <div key={stage.id} className="flex items-center">
                    <button
                      onClick={() => setSelectedStage(selectedStage?.id === stage.id ? null : stage)}
                      className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all min-w-[140px] hover:bg-gray-800/50 ${statusBorder(stage.status)} ${
                        selectedStage?.id === stage.id ? 'ring-2 ring-purple-500' : ''
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full mb-2 ${statusColor(stage.status)}`} />
                      <span className="text-sm font-semibold text-center">{stage.name}</span>
                      <span className="text-[10px] text-gray-500 mt-1">{stage.source}</span>
                    </button>
                    {i < stages.length - 1 && (
                      <div className={`w-8 h-0.5 mx-1 ${
                        stage.status === 'complete' ? 'bg-green-500' : 'bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected stage detail */}
            {selectedStage && (
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{selectedStage.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{selectedStage.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedStage.status === 'complete' ? 'bg-green-500/20 text-green-400' :
                    selectedStage.status === 'active' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {selectedStage.status.toUpperCase()}
                  </span>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border-l-4 border-red-500">
                  <p className="text-xs text-red-400 font-mono">{selectedStage.primeDirective}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Skills involved:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStage.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <p className="text-3xl font-bold text-purple-400">36</p>
                <p className="text-xs text-gray-500 mt-1">Skills Loaded</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <p className="text-3xl font-bold text-blue-400">9</p>
                <p className="text-xs text-gray-500 mt-1">Pipeline Stages</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <p className="text-3xl font-bold text-green-400">5</p>
                <p className="text-xs text-gray-500 mt-1">Frameworks Merged</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <p className="text-3xl font-bold text-yellow-400">14</p>
                <p className="text-xs text-gray-500 mt-1">Cognitive Guards</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── SKILLS VIEW ─── */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filterCategory === cat ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSkills.map(skill => (
                <div key={skill.name} className="bg-gray-900 rounded-lg border border-gray-800 p-4 hover:border-gray-600 transition">
                  <div className="flex items-start justify-between">
                    <h4 className="font-mono text-sm font-semibold text-white">{skill.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 bg-gray-800 rounded text-gray-500">{skill.category}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{skill.description}</p>
                  <p className="text-[10px] text-gray-600 mt-2">Source: {skill.source}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── SOURCES VIEW ─── */}
        {activeTab === 'sources' && (
          <div className="space-y-4">
            {SOURCES.map(src => (
              <div key={src.name} className="bg-gray-900 rounded-xl border border-gray-800 p-6 flex items-center gap-6">
                <div className={`w-4 h-4 rounded-full ${src.color}`} />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{src.name}</h3>
                  <p className="text-sm text-gray-500 font-mono">{src.repo}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-300">{src.skills}</p>
                  <p className="text-xs text-gray-500">skills</p>
                </div>
              </div>
            ))}
            <div className="bg-gray-900 rounded-xl border border-purple-500/30 p-6 mt-6">
              <h3 className="font-bold text-purple-400 mb-2">GOD MODE v2 = Best of All</h3>
              <p className="text-sm text-gray-400">
                The CLAUDE.md operating system synthesizes the most powerful rules from all 5 frameworks into a single
                inline document. No per-turn file reads. Everything loads once at session start.
              </p>
            </div>
          </div>
        )}

        {/* ─── COGNITIVE TRAPS VIEW ─── */}
        {activeTab === 'traps' && (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm mb-4">
              These thoughts are WARNING SIGNS that Claude is about to skip a required step.
              Built from SuperClaude + Superpowers anti-rationalization research.
            </p>
            {COGNITIVE_TRAPS.map((trap, i) => (
              <div key={i} className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex gap-4">
                <div className="flex-1">
                  <p className="text-red-400 text-sm font-mono">{trap.thought}</p>
                </div>
                <div className="flex-1 border-l border-gray-800 pl-4">
                  <p className="text-green-400 text-sm">{trap.truth}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-gray-600">
          <span>GOD MODE v2 &mdash; 5 Frameworks, 36 Skills, 14 Cognitive Guards</span>
          <span>Built for Claude Code</span>
        </div>
      </footer>
    </div>
  );
}
