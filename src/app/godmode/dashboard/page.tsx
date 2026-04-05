'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────
interface AgentNode {
  id: string;
  name: string;
  role: 'orchestrator' | 'implementer' | 'spec-reviewer' | 'quality-reviewer' | 'researcher';
  status: 'idle' | 'spawned' | 'working' | 'waiting' | 'passed' | 'failed' | 'escalated';
  task?: string;
  attempts: number;
  maxAttempts: number;
  children: string[];
  pipelineStage: string;
}

interface PipelineStage {
  id: string;
  name: string;
  status: 'idle' | 'active' | 'complete' | 'skipped' | 'blocked';
}

// ─── Mock Data ────────────────────────────────────────────────
const INITIAL_AGENTS: AgentNode[] = [
  { id: 'orch-1', name: 'Orchestrator', role: 'orchestrator', status: 'working', task: 'Coordinate full pipeline', attempts: 0, maxAttempts: 1, children: ['task-a', 'task-b', 'task-c'], pipelineStage: 'orchestration' },
  { id: 'task-a', name: 'Task A: Build Dashboard', role: 'implementer', status: 'passed', task: 'Build GOD MODE dashboard page', attempts: 1, maxAttempts: 3, children: ['rev-a1', 'rev-a2'], pipelineStage: 'implementation' },
  { id: 'rev-a1', name: 'Spec Review A', role: 'spec-reviewer', status: 'passed', task: 'Verify dashboard spec compliance', attempts: 1, maxAttempts: 3, children: [], pipelineStage: 'quality-gate' },
  { id: 'rev-a2', name: 'Quality Review A', role: 'quality-reviewer', status: 'passed', task: 'Code quality check', attempts: 1, maxAttempts: 3, children: [], pipelineStage: 'quality-gate' },
  { id: 'task-b', name: 'Task B: Agent Tree View', role: 'implementer', status: 'working', task: 'Build agent tree visualization', attempts: 1, maxAttempts: 3, children: ['rev-b1'], pipelineStage: 'implementation' },
  { id: 'rev-b1', name: 'Spec Review B', role: 'spec-reviewer', status: 'waiting', task: 'Waiting for implementation', attempts: 0, maxAttempts: 3, children: [], pipelineStage: 'quality-gate' },
  { id: 'task-c', name: 'Task C: Live Monitor', role: 'implementer', status: 'idle', task: 'Build real-time monitoring', attempts: 0, maxAttempts: 3, children: ['rev-c1', 'rev-c2'], pipelineStage: 'implementation' },
  { id: 'rev-c1', name: 'Spec Review C', role: 'spec-reviewer', status: 'idle', task: 'Pending', attempts: 0, maxAttempts: 3, children: [], pipelineStage: 'quality-gate' },
  { id: 'rev-c2', name: 'Quality Review C', role: 'quality-reviewer', status: 'idle', task: 'Pending', attempts: 0, maxAttempts: 3, children: [], pipelineStage: 'quality-gate' },
  { id: 'res-1', name: 'Reference Researcher', role: 'researcher', status: 'passed', task: 'Search GitHub for swarm layouts', attempts: 1, maxAttempts: 1, children: [], pipelineStage: 'references' },
];

const PIPELINE_STAGES: PipelineStage[] = [
  { id: 'rationale', name: 'Rationale', status: 'complete' },
  { id: 'intent', name: 'Intent Discovery', status: 'complete' },
  { id: 'references', name: 'References', status: 'complete' },
  { id: 'design', name: 'Design', status: 'complete' },
  { id: 'plan-review', name: 'Plan Review', status: 'complete' },
  { id: 'implementation', name: 'Implementation', status: 'active' },
  { id: 'quality-gate', name: 'Quality Gate', status: 'idle' },
  { id: 'self-reflect', name: 'Self-Reflect', status: 'idle' },
  { id: 'merge', name: 'Merge & Deploy', status: 'idle' },
];

// ─── Helpers ──────────────────────────────────────────────────
function statusDot(status: AgentNode['status']): string {
  const map: Record<AgentNode['status'], string> = {
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

function statusLabel(status: AgentNode['status']): { text: string; color: string } {
  const map: Record<AgentNode['status'], { text: string; color: string }> = {
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

function roleIcon(role: AgentNode['role']): string {
  const map: Record<AgentNode['role'], string> = {
    orchestrator: '🎯',
    implementer: '🔨',
    'spec-reviewer': '📋',
    'quality-reviewer': '🔍',
    researcher: '🔬',
  };
  return map[role];
}

function roleBg(role: AgentNode['role']): string {
  const map: Record<AgentNode['role'], string> = {
    orchestrator: 'border-purple-500/50 bg-purple-500/5',
    implementer: 'border-yellow-500/50 bg-yellow-500/5',
    'spec-reviewer': 'border-blue-500/50 bg-blue-500/5',
    'quality-reviewer': 'border-cyan-500/50 bg-cyan-500/5',
    researcher: 'border-green-500/50 bg-green-500/5',
  };
  return map[role];
}

function pipelineStageColor(status: PipelineStage['status']): string {
  const map: Record<PipelineStage['status'], string> = {
    idle: 'bg-gray-800 border-gray-700 text-gray-500',
    active: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400',
    complete: 'bg-green-500/10 border-green-500/50 text-green-400',
    skipped: 'bg-gray-800 border-gray-600 text-gray-600',
    blocked: 'bg-red-500/10 border-red-500/50 text-red-400',
  };
  return map[status];
}

function pipelineConnectorColor(status: PipelineStage['status']): string {
  return status === 'complete' ? 'bg-green-500' : 'bg-gray-700';
}

// ─── Component ────────────────────────────────────────────────
export default function SwarmDashboard() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<AgentNode | null>(null);
  const [tick, setTick] = useState(0);

  // Simulated live tick
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    total: agents.length,
    working: agents.filter(a => a.status === 'working').length,
    passed: agents.filter(a => a.status === 'passed').length,
    failed: agents.filter(a => a.status === 'failed').length,
    waiting: agents.filter(a => a.status === 'waiting' || a.status === 'idle').length,
  };

  return (
    <div className="text-white space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            Swarm Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">Real-time agent orchestration dashboard</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Tick #{tick}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Agents', value: stats.total, color: 'text-purple-400' },
          { label: 'Working', value: stats.working, color: 'text-yellow-400' },
          { label: 'Passed', value: stats.passed, color: 'text-green-400' },
          { label: 'Failed', value: stats.failed, color: 'text-red-400' },
          { label: 'Queued', value: stats.waiting, color: 'text-gray-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mini Pipeline Strip */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-3">Pipeline Progress</h2>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage.id} className="flex items-center">
              <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap ${pipelineStageColor(stage.status)}`}>
                {stage.status === 'complete' && <span className="mr-1">&#10003;</span>}
                {stage.status === 'active' && <span className="mr-1 inline-block w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />}
                {stage.name}
              </div>
              {i < PIPELINE_STAGES.length - 1 && (
                <div className={`w-4 h-0.5 ${pipelineConnectorColor(stage.status)}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agent Swarm Grid */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-3">Agent Swarm</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {agents.map(agent => {
            const label = statusLabel(agent.status);
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
                className={`text-left p-4 rounded-xl border transition-all hover:shadow-lg ${roleBg(agent.role)} ${
                  selectedAgent?.id === agent.id ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{roleIcon(agent.role)}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
                      <p className="text-[10px] text-gray-500 font-mono">{agent.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${statusDot(agent.status)}`} />
                    <span className={`text-[10px] font-mono ${label.color}`}>{label.text}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 truncate">{agent.task}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-gray-600">Stage: {agent.pipelineStage}</span>
                  <span className="text-[10px] text-gray-600">
                    Attempts: {agent.attempts}/{agent.maxAttempts}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Agent Detail */}
      {selectedAgent && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{roleIcon(selectedAgent.role)}</span>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedAgent.name}</h3>
                <p className="text-sm text-gray-500 font-mono">{selectedAgent.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${statusDot(selectedAgent.status)}`} />
              <span className={`text-sm font-mono ${statusLabel(selectedAgent.status).color}`}>
                {statusLabel(selectedAgent.status).text}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Task</p>
              <p className="text-sm text-gray-300">{selectedAgent.task}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Pipeline Stage</p>
              <p className="text-sm text-gray-300 font-mono">{selectedAgent.pipelineStage}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Attempts</p>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: selectedAgent.maxAttempts }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-2 rounded-full ${
                      i < selectedAgent.attempts
                        ? selectedAgent.status === 'failed' ? 'bg-red-500' : 'bg-green-500'
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Children</p>
              <div className="flex flex-wrap gap-1">
                {selectedAgent.children.length > 0 ? selectedAgent.children.map(c => (
                  <span key={c} className="px-2 py-0.5 bg-gray-800 rounded text-[10px] text-gray-400 font-mono">{c}</span>
                )) : (
                  <span className="text-[10px] text-gray-600">No child agents</span>
                )}
              </div>
            </div>
          </div>

          {/* Trust Boundary Warning */}
          <div className="mt-4 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
            <p className="text-[10px] text-red-400 font-mono">
              TRUST BOUNDARY: Orchestrator verifies all claims directly. Never trust agent self-reports.
            </p>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-3">
        <Link href="/godmode/agents" className="bg-gray-900 rounded-xl border border-gray-800 p-4 hover:border-purple-500/30 transition group">
          <h3 className="text-sm font-semibold text-white group-hover:text-purple-400 transition">Agent Tree View</h3>
          <p className="text-xs text-gray-500 mt-1">Hierarchical parent/child visualization</p>
        </Link>
        <Link href="/godmode/monitor" className="bg-gray-900 rounded-xl border border-gray-800 p-4 hover:border-purple-500/30 transition group">
          <h3 className="text-sm font-semibold text-white group-hover:text-purple-400 transition">Live Monitor</h3>
          <p className="text-xs text-gray-500 mt-1">Real-time event log and verification output</p>
        </Link>
        <Link href="/godmode/pipeline" className="bg-gray-900 rounded-xl border border-gray-800 p-4 hover:border-purple-500/30 transition group">
          <h3 className="text-sm font-semibold text-white group-hover:text-purple-400 transition">Full Pipeline</h3>
          <p className="text-xs text-gray-500 mt-1">9-stage workflow with prime directives</p>
        </Link>
      </div>
    </div>
  );
}
