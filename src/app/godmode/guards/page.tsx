'use client';

const COGNITIVE_TRAPS = [
  { thought: '"This is too simple to need a test"', truth: 'Simple code breaks. Test takes 30 seconds.', category: 'Testing' },
  { thought: '"I\'ll test after implementing"', truth: 'Tests passing immediately prove nothing.', category: 'Testing' },
  { thought: '"The user asked for it, so we should build it"', truth: 'Users articulate desires, not validated needs.', category: 'Rationale' },
  { thought: '"It\'s too simple to question"', truth: 'Simple requests hide massive scope. "Just add auth" = 3 days minimum.', category: 'Rationale' },
  { thought: '"I should gather more context first"', truth: 'Skill invocation precedes clarification.', category: 'Activation' },
  { thought: '"I can check files and history quickly"', truth: 'Skills define HOW to check. Invoke first.', category: 'Activation' },
  { thought: '"This doesn\'t warrant a formal skill"', truth: 'If a matching workflow exists, use it.', category: 'Activation' },
  { thought: '"Tests pass, so I trust it"', truth: 'Tests validate behavior, not understanding.', category: 'Quality' },
  { thought: '"I\'ll review when things calm down"', truth: 'You will not. Context is perishable.', category: 'Quality' },
  { thought: '"Quick fix for now, investigate later"', truth: '"Later" means "never" or "at 10x the cost."', category: 'Diagnosis' },
  { thought: '"Just try changing X and see"', truth: 'Guessing is not engineering. Form a hypothesis.', category: 'Diagnosis' },
  { thought: '"One more fix attempt" (after 2+)', truth: "You're in a loop. STOP and reassess.", category: 'Diagnosis' },
  { thought: '"It works when I tested it manually"', truth: "Manual ≠ systematic. No record, can't re-run.", category: 'Verification' },
  { thought: '"Should pass now" / "Looks correct"', truth: 'Fabrication signal. Run the command and prove it.', category: 'Verification' },
];

const ESCALATION_LEVELS = [
  { level: 'GREEN', color: 'bg-green-500', textColor: 'text-green-400', borderColor: 'border-green-500/30', description: 'All systems nominal. Pipeline proceeding normally.', action: 'Continue execution.' },
  { level: 'YELLOW', color: 'bg-yellow-500', textColor: 'text-yellow-400', borderColor: 'border-yellow-500/30', description: '2 failures on the same gate. Concern logged.', action: 'Try fundamentally DIFFERENT approach. Do not repeat the same fix.' },
  { level: 'ORANGE', color: 'bg-orange-500', textColor: 'text-orange-400', borderColor: 'border-orange-500/30', description: '3 failures. Re-analysis required.', action: 'STOP. Re-analyze from scratch. Present revised analysis to user.' },
  { level: 'RED', color: 'bg-red-600', textColor: 'text-red-500', borderColor: 'border-red-600/30', description: '4+ failures. System HALT.', action: 'HALT. Present honest assessment. Wait for user direction. Do NOT "try one more thing."' },
];

const ANTI_HALLUCINATION = [
  { label: 'VERIFIED', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30', description: 'Has tool/search evidence backing the claim.' },
  { label: 'FROM TRAINING', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', description: 'Plausible but no tool evidence. Flag it to user.' },
  { label: 'FLAGGED', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', description: 'Contradicts tool evidence. CRITICAL — must correct immediately.' },
];

const categories = Array.from(new Set(COGNITIVE_TRAPS.map(t => t.category)));

export default function GuardsPage() {
  return (
    <div className="text-white space-y-8">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Cognitive Guards
        </h1>
        <p className="text-sm text-gray-500 mt-1">14 anti-rationalization guards + escalation ladder + anti-hallucination checks</p>
      </div>

      {/* Cognitive Traps */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-4">Cognitive Traps — Warning Signs</h2>
        {categories.map(cat => (
          <div key={cat} className="mb-6">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">{cat}</h3>
            <div className="space-y-2">
              {COGNITIVE_TRAPS.filter(t => t.category === cat).map((trap, i) => (
                <div key={i} className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-red-400 font-mono leading-relaxed">{trap.thought}</p>
                  </div>
                  <div className="w-px bg-gray-800" />
                  <div className="flex-1">
                    <p className="text-sm text-green-400 leading-relaxed">{trap.truth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Escalation Ladder */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-4">Error Recovery Escalation Ladder</h2>
        <div className="space-y-3">
          {ESCALATION_LEVELS.map(level => (
            <div key={level.level} className={`bg-gray-900 rounded-xl border p-5 ${level.borderColor}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-4 h-4 rounded-full ${level.color}`} />
                <h3 className={`font-bold ${level.textColor}`}>{level.level}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-2">{level.description}</p>
              <div className="p-2 bg-gray-800 rounded">
                <p className="text-xs text-gray-300 font-mono">{level.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anti-Hallucination */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-4">Anti-Hallucination Check</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {ANTI_HALLUCINATION.map(item => (
            <div key={item.label} className={`rounded-xl border p-5 ${item.bg}`}>
              <h3 className={`font-bold text-lg ${item.color} mb-2`}>{item.label}</h3>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Red Flags */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-4">Red Flags — STOP and Return to Phase 1</h2>
        <div className="bg-gray-900 rounded-xl border border-red-500/20 p-5">
          <ul className="space-y-2">
            {[
              '"Quick fix for now, investigate later"',
              '"Just try changing X and see"',
              '"I don\'t fully understand but this might work"',
              'Each fix reveals new problem in different place (wrong architecture)',
            ].map((flag, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-red-500 mt-0.5">&#10007;</span>
                <span className="text-red-400 font-mono">{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
