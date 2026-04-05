'use client';

import { useState } from 'react';

interface Skill {
  name: string;
  category: string;
  description: string;
  source: string;
  primeDirective?: string;
}

const SKILLS: Skill[] = [
  // Core Workflow
  { name: 'activation', category: 'Core Workflow', description: 'Auto-trigger skills before any response. "Is there even a 1% chance a skill applies? YES → Invoke it."', source: 'GOD MODE + Superpowers', primeDirective: 'SKILL INVOCATION PRECEDES CLARIFICATION' },
  { name: 'rationale', category: 'Core Workflow', description: '5-point analysis: Reality Check, Effort Analysis, Alternative Paths, Senior Engineer Perspective, Decision Point.', source: 'GOD MODE' },
  { name: 'intent-discovery', category: 'Core Workflow', description: 'Socratic refinement: Survey → Question → Propose → Design → Self-Review → Validate → Record.', source: 'GOD MODE + Superpowers', primeDirective: 'NO IMPLEMENTATION WITHOUT A VALIDATED DESIGN FIRST' },
  { name: 'task-planning', category: 'Core Workflow', description: 'Break into bite-sized steps (2-5 min each). Clear input/output/success criteria per task.', source: 'GOD MODE' },
  { name: 'task-runner', category: 'Core Workflow', description: 'Execute in batches (default: 3). After each batch: verify, test, commit.', source: 'GOD MODE' },
  { name: 'completion-gate', category: 'Core Workflow', description: 'IDENTIFY command → EXECUTE fresh → INSPECT output → CONFIRM evidence → ASSERT.', source: 'Superpowers', primeDirective: 'NO COMPLETION ASSERTIONS WITHOUT FRESH VERIFICATION OUTPUT' },
  // Execution
  { name: 'delegated-execution', category: 'Execution', description: '3-stage per task: Implementer → Spec Reviewer (PASS/FAIL) → Quality Reviewer. Max 3 retries per gate.', source: 'GOD MODE + Metaswarm' },
  { name: 'parallel-execution', category: 'Execution', description: 'Independent tasks run simultaneously. Confirm isolation before dispatch. Merge with conflict detection.', source: 'GOD MODE' },
  { name: 'team-orchestration', category: 'Execution', description: 'Patterns: Exploration (concurrent research), Feature (contract-first), Diagnosis (parallel hypotheses), Migration (conventions-first).', source: 'GOD MODE + Metaswarm' },
  { name: 'agent-messaging', category: 'Execution', description: 'Cross-agent communication protocol. Task specs pasted directly, not file references.', source: 'GOD MODE' },
  { name: 'workspace-isolation', category: 'Execution', description: 'Git worktree per agent. Isolated copy of repo. Auto-cleanup if no changes.', source: 'Superpowers' },
  // Quality
  { name: 'quality-gate', category: 'Quality', description: 'Pre-merge review: types, lint, tests, no dead code, functions <50 lines, files <300 lines.', source: 'GOD MODE' },
  { name: 'quality-enforcement', category: 'Quality', description: 'Coverage ratchet (never decrease). No `any` without justification. No commented-out code.', source: 'GOD MODE + claude-code-skills' },
  { name: 'review-response', category: 'Quality', description: 'Technical feedback processing. Classify: Critical/Important/Minor with file:line refs.', source: 'GOD MODE' },
  { name: 'comprehension-check', category: 'Quality', description: 'For every modified file: WHAT changed, WHY, CONTEXT (interactions), HAZARD (failure modes).', source: 'SuperClaude' },
  // Research
  { name: 'reference-engine', category: 'Research', description: 'Route by task: website → design-research, database → system-design, feature → codebase-research, API → specification-first.', source: 'GOD MODE' },
  { name: 'github-search', category: 'Research', description: '3+ query variations, 2+ channels. Evaluate: 100+ stars, active maintenance, tests, license.', source: 'GOD MODE' },
  { name: 'codebase-research', category: 'Research', description: 'Find 2+ similar files before writing new code. Match EVERY convention.', source: 'GOD MODE' },
  { name: 'design-research', category: 'Research', description: 'Analyze 3-5 templates. Established UI/UX patterns. Accessibility standards.', source: 'GOD MODE' },
  // Dev Practices
  { name: 'test-first', category: 'Dev Practices', description: 'RED (failing test) → Verify RED → GREEN (minimum code) → Verify GREEN → REFACTOR. Zero tolerance.', source: 'GOD MODE + Superpowers', primeDirective: 'CODE BEFORE TEST? DELETE IT. START OVER.' },
  { name: 'specification-first', category: 'Dev Practices', description: 'Template: Purpose → Inputs → Outputs → Behavior → Edge Cases → Acceptance Criteria → Excluded.', source: 'GOD MODE' },
  { name: 'fault-diagnosis', category: 'Dev Practices', description: '4 phases: Root Cause Investigation → Pattern Analysis → Hypothesis Testing → Implementation. Never patch symptoms.', source: 'GOD MODE + Superpowers' },
  { name: 'error-recovery', category: 'Dev Practices', description: 'Yellow (2 fails): different approach. Orange (3 fails): re-analyze. Red (4+ fails): HALT.', source: 'Metaswarm + Superpowers' },
  { name: 'merge-protocol', category: 'Dev Practices', description: '4 options: Local merge | Push + PR | Keep branch | Discard. No force push without permission.', source: 'GOD MODE + Superpowers' },
  { name: 'pattern-matching', category: 'Dev Practices', description: 'Survey 2-3 similar files → Catalog conventions → Replicate exactly → Audit (spot the newcomer?).', source: 'GOD MODE + Superpowers' },
  // Architecture
  { name: 'system-design', category: 'Architecture', description: 'Defaults: Monolith, PostgreSQL, REST, Sessions. Add complexity only when proven necessary.', source: 'GOD MODE' },
  { name: 'ui-engineering', category: 'Architecture', description: 'Semantic HTML first. A11y mandatory: focus-visible, ARIA, keyboard nav, 4.5:1 contrast. All 6 states.', source: 'GOD MODE' },
  { name: 'design-integration', category: 'Architecture', description: 'Never rebuild what design system provides. Detect → Study API → Consume directly. Extend only via documented points.', source: 'claude-code-skills' },
  { name: 'ux-patterns', category: 'Architecture', description: 'Determine project type (SaaS/Marketing/E-commerce/DevTool/Game). Adopt patterns per category.', source: 'GOD MODE' },
  // Infrastructure
  { name: 'project-bootstrap', category: 'Infrastructure', description: 'TS strict, linter+formatter, design tokens first, .env.example, CI pipeline, feature-organized.', source: 'GOD MODE' },
  { name: 'environment-awareness', category: 'Infrastructure', description: 'Detect runtime, framework, package manager (check lockfiles), test runner, linter config. Never assume.', source: 'GOD MODE' },
  { name: 'deployment-advisor', category: 'Infrastructure', description: 'Match infra to needs. Classify: REQUIRED NOW / SOON / NICE TO HAVE / SPECULATIVE.', source: 'GOD MODE' },
  { name: 'performance-tuning', category: 'Infrastructure', description: 'No optimization without measurement. Check: DB queries → network → serialization → computation → I/O.', source: 'GOD MODE' },
  { name: 'security-protocol', category: 'Infrastructure', description: 'Validate all external input. Parameterized queries. Least privilege. CSP/HSTS headers.', source: 'GOD MODE' },
  // Meta
  { name: 'knowledge-capture', category: 'Meta', description: 'Categories: pattern, gotcha, decision, api_behavior, performance, security. Confidence: Low→Medium→High.', source: 'Metaswarm' },
  { name: 'protocol-authoring', category: 'Meta', description: 'TDD for documentation. Spec becomes test plan and docs simultaneously.', source: 'GOD MODE' },
];

const CATEGORIES = ['All', ...Array.from(new Set(SKILLS.map(s => s.category)))];

const CATEGORY_COLORS: Record<string, string> = {
  'Core Workflow': 'border-purple-500/30',
  'Execution': 'border-yellow-500/30',
  'Quality': 'border-green-500/30',
  'Research': 'border-blue-500/30',
  'Dev Practices': 'border-orange-500/30',
  'Architecture': 'border-cyan-500/30',
  'Infrastructure': 'border-red-500/30',
  'Meta': 'border-pink-500/30',
};

export default function SkillsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = SKILLS.filter(s => {
    if (filter !== 'All' && s.category !== filter) return false;
    if (search && !s.name.includes(search.toLowerCase()) && !s.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="text-white space-y-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Skills Registry
        </h1>
        <p className="text-sm text-gray-500 mt-1">{SKILLS.length} skills across {CATEGORIES.length - 1} categories</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 flex-1"
        />
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === cat ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map(skill => (
          <div key={skill.name} className={`bg-gray-900 rounded-lg border p-4 hover:bg-gray-800/50 transition ${CATEGORY_COLORS[skill.category] || 'border-gray-800'}`}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-mono text-sm font-bold text-white">{skill.name}</h3>
              <span className="text-[10px] px-2 py-0.5 bg-gray-800 rounded text-gray-500 shrink-0 ml-2">{skill.category}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{skill.description}</p>
            {skill.primeDirective && (
              <div className="mt-2 p-2 bg-red-500/5 border border-red-500/20 rounded">
                <p className="text-[9px] text-red-400 font-mono">{skill.primeDirective}</p>
              </div>
            )}
            <p className="text-[10px] text-gray-600 mt-2">Source: {skill.source}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-600 py-8">No skills match your search.</p>
      )}
    </div>
  );
}
