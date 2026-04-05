'use client';

import { useState } from 'react';

type StageStatus = 'idle' | 'active' | 'complete' | 'skipped' | 'blocked';

interface Stage {
  id: string;
  name: string;
  description: string;
  source: string;
  status: StageStatus;
  skills: string[];
  primeDirective: string;
  skipCondition: string;
}

const STAGES: Stage[] = [
  {
    id: 'rationale', name: 'Rationale', source: 'GOD MODE',
    description: 'Challenge whether the work is worth doing. 5-point analysis: Reality Check, Effort Analysis, Alternative Paths, Senior Engineer Perspective, Decision Point.',
    skills: ['rationale', 'reference-engine', 'github-search'],
    primeDirective: 'NO WORK WITHOUT QUESTIONING WHETHER THE WORK IS WORTH DOING',
    skipCondition: 'Bug fixes, security patches, trivial changes', status: 'idle',
  },
  {
    id: 'intent-discovery', name: 'Intent Discovery', source: 'GOD MODE + Superpowers',
    description: 'Socratic refinement: Survey project → Question (one at a time) → Propose 2-3 approaches → Design spec → Self-review → Validate → Record.',
    skills: ['intent-discovery', 'specification-first'],
    primeDirective: 'NO IMPLEMENTATION WITHOUT A VALIDATED DESIGN FIRST',
    skipCondition: 'Trivial tasks (typos, config changes)', status: 'idle',
  },
  {
    id: 'references', name: 'References', source: 'GOD MODE',
    description: 'Search before building: Codebase patterns, Design research, GitHub repos (3+ queries, 2+ channels), System design defaults.',
    skills: ['reference-engine', 'codebase-research', 'design-research', 'github-search'],
    primeDirective: 'NO BUILDING WITHOUT A REFERENCE',
    skipCondition: 'Never — always search first', status: 'idle',
  },
  {
    id: 'design', name: 'Design', source: 'GOD MODE + claude-code-skills',
    description: 'UI Engineering (semantic HTML, a11y, states), Design Tokens (never raw values), Design System Integration (never rebuild), UX Patterns.',
    skills: ['ui-engineering', 'design-integration', 'ux-patterns', 'system-design'],
    primeDirective: 'NO UI CODE WITHOUT UX REFERENCE FIRST',
    skipCondition: 'Non-UI tasks', status: 'idle',
  },
  {
    id: 'plan-review', name: 'Plan Review Gate', source: 'Metaswarm',
    description: '3-dimension validation: Feasibility (paths exist? deps ordered?), Completeness (all reqs mapped?), Scope Alignment (matches ask? simpler alt?).',
    skills: ['task-planning', 'task-runner'],
    primeDirective: 'NO PLAN PRESENTED WITHOUT 3-DIMENSION VALIDATION',
    skipCondition: 'Single-file changes', status: 'idle',
  },
  {
    id: 'implementation', name: 'Implementation', source: 'GOD MODE + Superpowers',
    description: 'Test-first (RED→GREEN→REFACTOR). Pattern matching (survey 2-3 similar files). Environment awareness. 3-stage subagent pipeline per task.',
    skills: ['test-first', 'pattern-matching', 'environment-awareness', 'delegated-execution'],
    primeDirective: 'NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST',
    skipCondition: 'Never', status: 'idle',
  },
  {
    id: 'quality-gate', name: 'Quality Gate', source: 'GOD MODE + Superpowers + Metaswarm',
    description: 'Evidence before claims: tsc --noEmit, eslint, vitest run, git diff --name-only. Every modified file: WHAT, WHY, CONTEXT, HAZARD.',
    skills: ['quality-enforcement', 'security-protocol', 'completion-gate', 'comprehension-check'],
    primeDirective: 'NO COMPLETION ASSERTIONS WITHOUT FRESH VERIFICATION OUTPUT',
    skipCondition: 'Never', status: 'idle',
  },
  {
    id: 'self-reflect', name: 'Self-Reflect', source: 'Metaswarm',
    description: 'Extract learnings: patterns that worked, gotchas discovered, decisions made. Capture with confidence levels. Promote: Insight → Conviction → Rule.',
    skills: ['knowledge-capture', 'error-recovery'],
    primeDirective: 'EVERY INTERACTION PRODUCES KNOWLEDGE',
    skipCondition: 'Trivial tasks', status: 'idle',
  },
  {
    id: 'merge', name: 'Merge & Deploy', source: 'GOD MODE + Superpowers',
    description: 'Present 4 options: Local merge, Push + PR, Keep branch, Discard. No force pushes. Performance targets: LCP<2.5s, INP<200ms, CLS<0.1.',
    skills: ['merge-protocol', 'deployment-advisor', 'performance-tuning'],
    primeDirective: 'NO CODE LANDS WITHOUT ALL QUALITY CHECKS PASSING',
    skipCondition: 'Never', status: 'idle',
  },
];

function statusStyle(s: StageStatus) {
  return {
    idle: { dot: 'bg-gray-500', border: 'border-gray-700', bg: 'bg-gray-900', text: 'text-gray-500' },
    active: { dot: 'bg-yellow-400 animate-pulse', border: 'border-yellow-500/50', bg: 'bg-yellow-500/5', text: 'text-yellow-400' },
    complete: { dot: 'bg-green-500', border: 'border-green-500/50', bg: 'bg-green-500/5', text: 'text-green-400' },
    skipped: { dot: 'bg-gray-400', border: 'border-gray-600', bg: 'bg-gray-800', text: 'text-gray-400' },
    blocked: { dot: 'bg-red-500', border: 'border-red-500/50', bg: 'bg-red-500/5', text: 'text-red-400' },
  }[s];
}

export default function PipelinePage() {
  const [stages, setStages] = useState(STAGES);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function simulatePipeline() {
    setStages(STAGES.map(s => ({ ...s, status: 'idle' as StageStatus })));
    setExpandedId(null);

    STAGES.forEach((_, i) => {
      setTimeout(() => {
        setStages(prev => prev.map((s, j) => ({
          ...s,
          status: (j < i ? 'complete' : j === i ? 'active' : 'idle') as StageStatus,
        })));
        setExpandedId(STAGES[i].id);
      }, (i + 1) * 1000);
    });

    setTimeout(() => {
      setStages(prev => prev.map(s => ({ ...s, status: 'complete' as StageStatus })));
    }, (STAGES.length + 1) * 1000);
  }

  return (
    <div className="text-white space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Pipeline
          </h1>
          <p className="text-sm text-gray-500 mt-1">9-stage mandatory workflow with prime directives</p>
        </div>
        <button onClick={simulatePipeline} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition">
          Simulate
        </button>
      </div>

      {/* Vertical Pipeline */}
      <div className="space-y-0">
        {stages.map((stage, i) => {
          const style = statusStyle(stage.status);
          const isExpanded = expandedId === stage.id;

          return (
            <div key={stage.id}>
              {/* Connector */}
              {i > 0 && (
                <div className="flex justify-center">
                  <div className={`w-0.5 h-6 ${stages[i - 1].status === 'complete' ? 'bg-green-500' : 'bg-gray-700'}`} />
                </div>
              )}

              {/* Stage Card */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : stage.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all hover:shadow-lg ${style.border} ${style.bg}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${style.dot}`} />
                    <div>
                      <h3 className="text-sm font-bold text-white">{stage.name}</h3>
                      <p className="text-[10px] text-gray-500">{stage.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono ${style.text}`}>
                      {stage.status.toUpperCase()}
                    </span>
                    <span className="text-gray-600 text-xs">{isExpanded ? '▼' : '▶'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-3" onClick={e => e.stopPropagation()}>
                    <p className="text-xs text-gray-400">{stage.description}</p>

                    <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                      <p className="text-[10px] text-red-400 font-mono">{stage.primeDirective}</p>
                    </div>

                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">Skip condition:</p>
                      <p className="text-[10px] text-gray-400">{stage.skipCondition}</p>
                    </div>

                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {stage.skills.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-gray-800 rounded text-[10px] text-gray-400 font-mono">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
