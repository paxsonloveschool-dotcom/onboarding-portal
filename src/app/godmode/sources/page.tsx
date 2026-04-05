'use client';

const SOURCES = [
  {
    name: 'GOD MODE',
    repo: 'NoobyGains/godmode',
    color: 'bg-purple-500',
    borderColor: 'border-purple-500/30',
    skills: 36,
    description: '36 composable skills with gated pipeline. The foundation framework that defines the 9-stage workflow, rationale gates, and intent discovery.',
    contributions: ['9-stage pipeline', 'Rationale gate', 'Intent discovery', '36 skill system', 'Task planning', 'Reference engine', 'UI engineering', 'Merge protocol'],
  },
  {
    name: 'Metaswarm',
    repo: 'dsifry/metaswarm',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500/30',
    skills: 13,
    description: 'Self-improvement, adversarial review, knowledge persistence, and the critical "never trust subagents" rule. Adds the verification layer.',
    contributions: ['Never trust self-reports', 'Plan review gate (3D)', 'Knowledge persistence', 'Pattern promotion', 'Fresh reviewer rule', 'Max 3 retries per gate'],
  },
  {
    name: 'SuperClaude',
    repo: 'SuperClaude-Org/SuperClaude_Framework',
    color: 'bg-orange-500',
    borderColor: 'border-orange-500/30',
    skills: 20,
    description: 'Behavioral injection, cognitive personas, prime directives. Adds the comprehension check and "understand before commit" philosophy.',
    contributions: ['Comprehension check', 'WHAT/WHY/CONTEXT/HAZARD', 'Cognitive personas', 'Behavioral injection'],
  },
  {
    name: 'Superpowers',
    repo: 'obra/superpowers',
    color: 'bg-green-500',
    borderColor: 'border-green-500/30',
    skills: 11,
    description: 'Auto-triggering, evidence-before-claims, systematic debugging, subagent-driven development. The "1% chance → invoke it" rule.',
    contributions: ['Auto-triggering (1% rule)', 'Evidence before claims', 'Completion gate', 'Error recovery escalation', 'Subagent-driven dev'],
  },
  {
    name: 'claude-code-skills',
    repo: 'levnikolaevich/claude-code-skills',
    color: 'bg-red-500',
    borderColor: 'border-red-500/30',
    skills: 129,
    description: 'Multi-model review, 28 validation criteria, anti-hallucination checks. Design system integration and the "never rebuild" rule.',
    contributions: ['Anti-hallucination check', 'Design system integration', '28 validation criteria', 'Quality enforcement', 'Multi-model review'],
  },
];

export default function SourcesPage() {
  return (
    <div className="text-white space-y-8">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Framework Sources
        </h1>
        <p className="text-sm text-gray-500 mt-1">5 frameworks synthesized into GOD MODE v2</p>
      </div>

      {/* Source Cards */}
      <div className="space-y-4">
        {SOURCES.map(src => (
          <div key={src.name} className={`bg-gray-900 rounded-xl border p-6 ${src.borderColor}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full ${src.color}`} />
                <div>
                  <h2 className="text-lg font-bold">{src.name}</h2>
                  <p className="text-sm text-gray-500 font-mono">{src.repo}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-300">{src.skills}</p>
                <p className="text-xs text-gray-500">skills</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-4">{src.description}</p>

            <div>
              <p className="text-xs text-gray-500 mb-2">Key contributions to GOD MODE v2:</p>
              <div className="flex flex-wrap gap-2">
                {src.contributions.map(c => (
                  <span key={c} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">{c}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Synthesis Summary */}
      <div className="bg-gray-900 rounded-xl border border-purple-500/30 p-6">
        <h2 className="font-bold text-purple-400 mb-3 text-lg">GOD MODE v2 = Best of All</h2>
        <p className="text-sm text-gray-400 mb-4">
          The CLAUDE.md operating system synthesizes the most powerful rules from all 5 frameworks into a single
          inline document. No per-turn file reads. Everything loads once at session start.
        </p>
        <div className="grid md:grid-cols-4 gap-3">
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-purple-400">36</p>
            <p className="text-[10px] text-gray-500">Skills</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-400">9</p>
            <p className="text-[10px] text-gray-500">Pipeline Stages</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-400">14</p>
            <p className="text-[10px] text-gray-500">Cognitive Guards</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-yellow-400">5</p>
            <p className="text-[10px] text-gray-500">Frameworks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
