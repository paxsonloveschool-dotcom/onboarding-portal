'use client';

import { useState, useEffect, useRef } from 'react';

interface LogEntry {
  id: number;
  timestamp: string;
  agent: string;
  event: 'spawn' | 'start' | 'pass' | 'fail' | 'verify' | 'escalate' | 'dispatch' | 'complete';
  message: string;
  detail?: string;
}

const EVENT_COLORS: Record<LogEntry['event'], string> = {
  spawn: 'text-blue-400',
  start: 'text-yellow-400',
  pass: 'text-green-400',
  fail: 'text-red-400',
  verify: 'text-cyan-400',
  escalate: 'text-red-500',
  dispatch: 'text-purple-400',
  complete: 'text-emerald-400',
};

const EVENT_BADGES: Record<LogEntry['event'], string> = {
  spawn: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  start: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  pass: 'bg-green-500/10 text-green-400 border-green-500/30',
  fail: 'bg-red-500/10 text-red-400 border-red-500/30',
  verify: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  escalate: 'bg-red-600/10 text-red-500 border-red-600/30',
  dispatch: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  complete: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
};

const SIMULATED_LOG: LogEntry[] = [
  { id: 1, timestamp: '09:00:01', agent: 'orch', event: 'start', message: 'Pipeline started — GOD MODE v2 full build' },
  { id: 2, timestamp: '09:00:02', agent: 'orch', event: 'dispatch', message: 'Dispatched parallel researchers', detail: 'res-1 (codebase), res-2 (github)' },
  { id: 3, timestamp: '09:00:03', agent: 'res-1', event: 'spawn', message: 'Codebase Researcher spawned' },
  { id: 4, timestamp: '09:00:03', agent: 'res-2', event: 'spawn', message: 'GitHub Researcher spawned' },
  { id: 5, timestamp: '09:00:15', agent: 'res-1', event: 'pass', message: 'Found layout patterns in hp-landscaping/', detail: '3 layout files analyzed' },
  { id: 6, timestamp: '09:00:22', agent: 'res-2', event: 'pass', message: 'Found 10 swarm visualization repos', detail: 'mission-control (3.7k★), Claude-Code-Agent-Monitor (48★)' },
  { id: 7, timestamp: '09:00:23', agent: 'orch', event: 'dispatch', message: 'Dispatched Implementer A — Build dashboard' },
  { id: 8, timestamp: '09:00:24', agent: 'impl-a', event: 'spawn', message: 'Implementer A spawned with full task spec' },
  { id: 9, timestamp: '09:00:25', agent: 'impl-a', event: 'start', message: 'Writing failing test (RED phase)' },
  { id: 10, timestamp: '09:01:45', agent: 'impl-a', event: 'pass', message: 'Implementation complete — 439 lines' },
  { id: 11, timestamp: '09:01:46', agent: 'orch', event: 'verify', message: 'Running tsc --noEmit', detail: 'Exit code: 0 — No errors' },
  { id: 12, timestamp: '09:01:48', agent: 'orch', event: 'verify', message: 'Running eslint on changed files', detail: 'Exit code: 0 — Clean' },
  { id: 13, timestamp: '09:01:50', agent: 'spec-a', event: 'spawn', message: 'Spec Reviewer A spawned (fresh instance)' },
  { id: 14, timestamp: '09:02:10', agent: 'spec-a', event: 'pass', message: 'Spec compliance: PASS', detail: 'All 9 pipeline stages, 36 skills, 4 tabs present' },
  { id: 15, timestamp: '09:02:11', agent: 'qual-a', event: 'spawn', message: 'Quality Reviewer A spawned (fresh instance)' },
  { id: 16, timestamp: '09:02:30', agent: 'qual-a', event: 'pass', message: 'Code quality: PASS', detail: '0 Critical, 0 Important, 2 Minor suggestions' },
  { id: 17, timestamp: '09:02:31', agent: 'orch', event: 'dispatch', message: 'Dispatched Implementer B — Agent tree view' },
  { id: 18, timestamp: '09:02:32', agent: 'impl-b', event: 'spawn', message: 'Implementer B spawned' },
  { id: 19, timestamp: '09:02:33', agent: 'impl-b', event: 'start', message: 'Writing failing test (RED phase)' },
  { id: 20, timestamp: '09:03:00', agent: 'impl-b', event: 'fail', message: 'First attempt failed — recursive tree overflow', detail: 'Attempt 1/3 — Yellow alert' },
  { id: 21, timestamp: '09:03:05', agent: 'impl-b', event: 'start', message: 'Retry with depth-limited approach (attempt 2/3)' },
];

export default function LiveMonitorPage() {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState<LogEntry['event'] | 'all'>('all');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    let i = log.length;
    const interval = setInterval(() => {
      if (i >= SIMULATED_LOG.length) {
        setIsPlaying(false);
        return;
      }
      setLog(prev => [...prev, SIMULATED_LOG[i]]);
      i++;
    }, 400);

    return () => clearInterval(interval);
  }, [isPlaying, log.length]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const filteredLog = filter === 'all' ? log : log.filter(e => e.event === filter);
  const events: (LogEntry['event'] | 'all')[] = ['all', 'spawn', 'start', 'pass', 'fail', 'verify', 'escalate', 'dispatch', 'complete'];

  return (
    <div className="text-white space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Live Monitor
          </h1>
          <p className="text-sm text-gray-500 mt-1">Real-time event log with verification output</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setLog([]); setIsPlaying(true); }}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition"
          >
            {isPlaying ? 'Restart' : 'Play Simulation'}
          </button>
          {log.length > 0 && (
            <button
              onClick={() => { setLog([]); setIsPlaying(false); }}
              className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-400 hover:text-white transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Event Filter */}
      <div className="flex flex-wrap gap-1">
        {events.map(e => (
          <button
            key={e}
            onClick={() => setFilter(e)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              filter === e ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {e.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Log */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-3 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-xs text-gray-400 font-mono">
              {isPlaying ? 'STREAMING' : log.length > 0 ? 'PAUSED' : 'IDLE'}
            </span>
          </div>
          <span className="text-xs text-gray-500">{filteredLog.length} events</span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 font-mono text-xs space-y-1">
          {filteredLog.length === 0 && (
            <p className="text-gray-600 text-center py-8">
              {isPlaying ? 'Waiting for events...' : 'Click "Play Simulation" to start'}
            </p>
          )}
          {filteredLog.map(entry => (
            <div key={entry.id} className="flex items-start gap-3 py-1.5 border-b border-gray-800/50 last:border-0">
              <span className="text-gray-600 w-16 shrink-0">{entry.timestamp}</span>
              <span className={`px-1.5 py-0.5 rounded border text-[10px] w-16 text-center shrink-0 ${EVENT_BADGES[entry.event]}`}>
                {entry.event.toUpperCase()}
              </span>
              <span className="text-purple-400 w-16 shrink-0">{entry.agent}</span>
              <div className="flex-1">
                <span className={EVENT_COLORS[entry.event]}>{entry.message}</span>
                {entry.detail && (
                  <p className="text-gray-600 mt-0.5">{entry.detail}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>

      {/* Verification Panel */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h2 className="text-sm font-semibold text-gray-400 mb-3">Last Verification Output</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { tool: 'tsc --noEmit', status: 'pass' as const, output: 'No errors found.' },
            { tool: 'eslint', status: 'pass' as const, output: '0 problems (0 errors, 0 warnings)' },
            { tool: 'vitest run', status: 'pass' as const, output: 'Tests: 12 passed | Duration: 1.2s' },
          ].map(v => (
            <div key={v.tool} className={`p-3 rounded-lg border ${
              v.status === 'pass' ? 'bg-green-500/5 border-green-500/30' : 'bg-red-500/5 border-red-500/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gray-400">{v.tool}</span>
                <span className={`text-[10px] font-bold ${v.status === 'pass' ? 'text-green-400' : 'text-red-400'}`}>
                  {v.status.toUpperCase()}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-mono">{v.output}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
