'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────
interface SwarmAgent {
  id: string;
  name: string;
  role: 'orchestrator' | 'implementer' | 'spec-reviewer' | 'quality-reviewer' | 'researcher';
  status: 'idle' | 'spawned' | 'working' | 'waiting' | 'passed' | 'failed' | 'escalated';
  task: string;
  attempts: number;
  maxAttempts: number;
  parentId: string | null;
  stage: string;
  verification?: {
    tsc: 'pass' | 'fail' | null;
    eslint: 'pass' | 'fail' | null;
    vitest: 'pass' | 'fail' | null;
  };
}

// ─── Full Swarm Tree Data ─────────────────────────────────────
const SWARM: SwarmAgent[] = [
  // Root orchestrator
  { id: 'orch', name: 'Orchestrator', role: 'orchestrator', status: 'working', task: 'Coordinate GOD MODE v2 pipeline', attempts: 0, maxAttempts: 1, parentId: null, stage: 'orchestration' },

  // Research agents (parallel)
  { id: 'res-1', name: 'Codebase Researcher', role: 'researcher', status: 'passed', task: 'Scan existing layout patterns', attempts: 1, maxAttempts: 1, parentId: 'orch', stage: 'references' },
  { id: 'res-2', name: 'GitHub Researcher', role: 'researcher', status: 'passed', task: 'Search swarm visualization repos', attempts: 1, maxAttempts: 1, parentId: 'orch', stage: 'references' },

  // Task A: Dashboard — full 3-stage pipeline
  { id: 'impl-a', name: 'Implementer A', role: 'implementer', status: 'passed', task: 'Build swarm dashboard page', attempts: 1, maxAttempts: 3, parentId: 'orch', stage: 'implementation' },
  { id: 'spec-a', name: 'Spec Reviewer A', role: 'spec-reviewer', status: 'passed', task: 'Verify dashboard matches spec', attempts: 1, maxAttempts: 3, parentId: 'impl-a', stage: 'quality-gate', verification: { tsc: 'pass', eslint: 'pass', vitest: 'pass' } },
  { id: 'qual-a', name: 'Quality Reviewer A', role: 'quality-reviewer', status: 'passed', task: 'Code quality & accessibility', attempts: 1, maxAttempts: 3, parentId: 'impl-a', stage: 'quality-gate' },

  // Task B: Agent Tree — in progress
  { id: 'impl-b', name: 'Implementer B', role: 'implementer', status: 'working', task: 'Build agent tree visualization', attempts: 2, maxAttempts: 3, parentId: 'orch', stage: 'implementation' },
  { id: 'spec-b', name: 'Spec Reviewer B', role: 'spec-reviewer', status: 'waiting', task: 'Awaiting implementation', attempts: 0, maxAttempts: 3, parentId: 'impl-b', stage: 'quality-gate' },
  { id: 'qual-b', name: 'Quality Reviewer B', role: 'quality-reviewer', status: 'idle', task: 'Pending spec pass', attempts: 0, maxAttempts: 3, parentId: 'impl-b', stage: 'quality-gate' },

  // Task C: Monitor — queued
  { id: 'impl-c', name: 'Implementer C', role: 'implementer', status: 'idle', task: 'Build live monitor', attempts: 0, maxAttempts: 3, parentId: 'orch', stage: 'implementation' },
  { id: 'spec-c', name: 'Spec Reviewer C', role: 'spec-reviewer', status: 'idle', task: 'Pending', attempts: 0, maxAttempts: 3, parentId: 'impl-c', stage: 'quality-gate' },
  { id: 'qual-c', name: 'Quality Reviewer C', role: 'quality-reviewer', status: 'idle', task: 'Pending', attempts: 0, maxAttempts: 3, parentId: 'impl-c', stage: 'quality-gate' },

  // Task D: Skills Registry — queued
  { id: 'impl-d', name: 'Implementer D', role: 'implementer', status: 'idle', task: 'Build skills registry page', attempts: 0, maxAttempts: 3, parentId: 'orch', stage: 'implementation' },
  { id: 'spec-d', name: 'Spec Reviewer D', role: 'spec-reviewer', status: 'idle', task: 'Pending', attempts: 0, maxAttempts: 3, parentId: 'impl-d', stage: 'quality-gate' },
];

// ─── Helpers ──────────────────────────────────────────────────
function getChildren(agents: SwarmAgent[], parentId: string): SwarmAgent[] {
  return agents.filter(a => a.parentId === parentId);
}

function statusColor(status: SwarmAgent['status']): string {
  const map: Record<SwarmAgent['status'], string> = {
    idle: 'border-gray-700 bg-gray-900',
    spawned: 'border-blue-500/50 bg-blue-500/5',
    working: 'border-yellow-500/50 bg-yellow-500/5',
    waiting: 'border-orange-500/50 bg-orange-500/5',
    passed: 'border-green-500/50 bg-green-500/5',
    failed: 'border-red-500/50 bg-red-500/5',
    escalated: 'border-red-600/80 bg-red-500/10',
  };
  return map[status];
}

function dotColor(status: SwarmAgent['status']): string {
  const map: Record<SwarmAgent['status'], string> = {
    idle: 'bg-gray-500',
    spawned: 'bg-blue-400 animate-pulse',
    working: 'bg-yellow-400 animate-pulse',
    waiting: 'bg-orange-400',
    passed: 'bg-green-500',
    failed: 'bg-red-500',
    escalated: 'bg-red-600 animate-ping',
  };
  return map[status];
}

function roleEmoji(role: SwarmAgent['role']): string {
  return { orchestrator: '🎯', implementer: '🔨', 'spec-reviewer': '📋', 'quality-reviewer': '🔍', researcher: '🔬' }[role];
}

function statusText(status: SwarmAgent['status']): { text: string; color: string } {
  const map: Record<SwarmAgent['status'], { text: string; color: string }> = {
    idle: { text: 'IDLE', color: 'text-gray-500' },
    spawned: { text: 'SPAWNED', color: 'text-blue-400' },
    working: { text: 'WORKING', color: 'text-yellow-400' },
    waiting: { text: 'WAITING', color: 'text-orange-400' },
    passed: { text: 'PASSED', color: 'text-green-400' },
    failed: { text: 'FAILED', color: 'text-red-400' },
    escalated: { text: 'ESCALATED', color: 'text-red-500' },
  };
  return map[status];
}

// ─── Tree Node Component ──────────────────────────────────────
function AgentTreeNode({
  agent,
  agents,
  depth = 0,
  selected,
  onSelect,
}: {
  agent: SwarmAgent;
  agents: SwarmAgent[];
  depth?: number;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const children = getChildren(agents, agent.id);
  const st = statusText(agent.status);

  return (
    <div className="relative">
      {/* Connector line */}
      {depth > 0 && (
        <div className="absolute -left-6 top-0 bottom-0 w-px bg-gray-800" />
      )}
      {depth > 0 && (
        <div className="absolute -left-6 top-5 w-6 h-px bg-gray-800" />
      )}

      {/* Node */}
      <button
        onClick={() => onSelect(agent.id)}
        className={`w-full text-left p-3 rounded-lg border transition-all mb-2 hover:shadow-md ${statusColor(agent.status)} ${
          selected === agent.id ? 'ring-2 ring-purple-500' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{roleEmoji(agent.role)}</span>
            <div>
              <span className="text-sm font-semibold text-white">{agent.name}</span>
              <span className="text-[10px] text-gray-600 ml-2 font-mono">{agent.id}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${dotColor(agent.status)}`} />
            <span className={`text-[10px] font-mono ${st.color}`}>{st.text}</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1 truncate">{agent.task}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[10px] text-gray-600">Stage: {agent.stage}</span>
          <span className="text-[10px] text-gray-600">Tries: {agent.attempts}/{agent.maxAttempts}</span>
          {agent.verification && (
            <div className="flex gap-1">
              {(['tsc', 'eslint', 'vitest'] as const).map(tool => (
                <span key={tool} className={`text-[9px] px-1 rounded ${
                  agent.verification![tool] === 'pass' ? 'bg-green-500/20 text-green-400' :
                  agent.verification![tool] === 'fail' ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-800 text-gray-600'
                }`}>
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>

      {/* Children */}
      {children.length > 0 && (
        <div className="pl-6 relative">
          {children.map(child => (
            <AgentTreeNode
              key={child.id}
              agent={child}
              agents={agents}
              depth={depth + 1}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────
export default function AgentTreePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedAgent = SWARM.find(a => a.id === selected) || null;

  const roots = SWARM.filter(a => a.parentId === null);

  return (
    <div className="text-white space-y-8">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Agent Tree
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Hierarchical view of all {SWARM.length} agents in the swarm
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tree */}
        <div className="lg:col-span-2 space-y-2">
          {roots.map(root => (
            <AgentTreeNode
              key={root.id}
              agent={root}
              agents={SWARM}
              selected={selected}
              onSelect={id => setSelected(selected === id ? null : id)}
            />
          ))}
        </div>

        {/* Detail Panel */}
        <div className="space-y-4">
          {selectedAgent ? (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 sticky top-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{roleEmoji(selectedAgent.role)}</span>
                <div>
                  <h2 className="text-lg font-bold">{selectedAgent.name}</h2>
                  <p className="text-xs text-gray-500 font-mono">{selectedAgent.id}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-3 h-3 rounded-full ${dotColor(selectedAgent.status)}`} />
                    <span className={`text-sm font-mono ${statusText(selectedAgent.status).color}`}>
                      {statusText(selectedAgent.status).text}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Task</p>
                  <p className="text-sm text-gray-300 mt-1">{selectedAgent.task}</p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Role</p>
                  <p className="text-sm text-gray-300 mt-1 capitalize">{selectedAgent.role.replace('-', ' ')}</p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Pipeline Stage</p>
                  <p className="text-sm text-gray-300 mt-1 font-mono">{selectedAgent.stage}</p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Attempts</p>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: selectedAgent.maxAttempts }).map((_, i) => (
                      <div key={i} className={`w-8 h-2.5 rounded-full ${
                        i < selectedAgent.attempts
                          ? selectedAgent.status === 'failed' ? 'bg-red-500' : 'bg-green-500'
                          : 'bg-gray-700'
                      }`} />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Parent</p>
                  <p className="text-sm text-gray-300 mt-1 font-mono">
                    {selectedAgent.parentId || '(root)'}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Children</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {getChildren(SWARM, selectedAgent.id).length > 0
                      ? getChildren(SWARM, selectedAgent.id).map(c => (
                          <button
                            key={c.id}
                            onClick={() => setSelected(c.id)}
                            className="px-2 py-0.5 bg-gray-800 hover:bg-gray-700 rounded text-[10px] text-gray-400 font-mono transition"
                          >
                            {c.id}
                          </button>
                        ))
                      : <span className="text-[10px] text-gray-600">Leaf node</span>
                    }
                  </div>
                </div>

                {selectedAgent.verification && (
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Verification</p>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {(['tsc', 'eslint', 'vitest'] as const).map(tool => (
                        <div key={tool} className={`p-2 rounded-lg text-center ${
                          selectedAgent.verification![tool] === 'pass' ? 'bg-green-500/10 border border-green-500/30' :
                          selectedAgent.verification![tool] === 'fail' ? 'bg-red-500/10 border border-red-500/30' :
                          'bg-gray-800 border border-gray-700'
                        }`}>
                          <p className="text-[10px] font-mono text-gray-400">{tool}</p>
                          <p className={`text-xs font-bold ${
                            selectedAgent.verification![tool] === 'pass' ? 'text-green-400' :
                            selectedAgent.verification![tool] === 'fail' ? 'text-red-400' :
                            'text-gray-600'
                          }`}>
                            {selectedAgent.verification![tool]?.toUpperCase() || '—'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Trust boundary */}
              <div className="mt-4 p-2 bg-red-500/5 border border-red-500/20 rounded-lg">
                <p className="text-[9px] text-red-400 font-mono leading-relaxed">
                  NEVER TRUST SELF-REPORTS. Orchestrator runs tsc, eslint, vitest directly.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 text-center">
              <p className="text-gray-500 text-sm">Select an agent to inspect</p>
            </div>
          )}

          {/* Legend */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Legend</h3>
            <div className="space-y-2 text-xs">
              {[
                { emoji: '🎯', label: 'Orchestrator', desc: 'Coordinates pipeline, verifies claims' },
                { emoji: '🔨', label: 'Implementer', desc: 'Writes code using TDD' },
                { emoji: '📋', label: 'Spec Reviewer', desc: 'Binary PASS/FAIL on requirements' },
                { emoji: '🔍', label: 'Quality Reviewer', desc: 'Code quality classification' },
                { emoji: '🔬', label: 'Researcher', desc: 'Codebase & GitHub search' },
              ].map(r => (
                <div key={r.label} className="flex items-center gap-2">
                  <span>{r.emoji}</span>
                  <span className="text-gray-300 font-medium w-28">{r.label}</span>
                  <span className="text-gray-600">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
