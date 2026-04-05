'use client';

import { useState } from 'react';

interface FunnelStage {
  id: string;
  name: string;
  type: 'lead-magnet' | 'tripwire' | 'core' | 'high-ticket';
  hook: string;
  story: string;
  offer: string;
  price: string;
  conversionTarget: string;
  color: string;
}

const DEFAULT_FUNNEL: FunnelStage[] = [
  {
    id: 'lead-magnet',
    name: 'Lead Magnet',
    type: 'lead-magnet',
    hook: 'Free AI Audit: See exactly what we\'d automate in your business',
    story: 'We scanned 200+ businesses and found that 73% waste 20+ hours/week on tasks AI can handle. Here\'s what we found for yours.',
    offer: 'Free personalized AI automation report — delivered in 24 hours. No calls, no commitment.',
    price: 'FREE',
    conversionTarget: '30-40% opt-in rate',
    color: 'border-green-500/30',
  },
  {
    id: 'tripwire',
    name: 'Tripwire',
    type: 'tripwire',
    hook: 'The AI Automation Starter Kit — build your first automation today',
    story: 'After our audit, most people ask "how do I actually start?" So we built the exact templates and SOPs we use for our first automation in every client project.',
    offer: '5 plug-and-play automation templates + video walkthroughs + private community access',
    price: '$47',
    conversionTarget: '8-15% of leads',
    color: 'border-blue-500/30',
  },
  {
    id: 'core',
    name: 'Core Offer',
    type: 'core',
    hook: 'The AI Playbook — complete system for automating your business',
    story: 'This is the exact playbook we used to go from manual everything to fully automated in 30 days. Every framework, every template, every agent configuration.',
    offer: 'Full course + templates + community + monthly Q&A calls + lifetime updates',
    price: '$997',
    conversionTarget: '3-5% of tripwire buyers',
    color: 'border-yellow-500/30',
  },
  {
    id: 'high-ticket',
    name: 'High-Ticket',
    type: 'high-ticket',
    hook: 'Done-For-You AI System — we build it, you profit',
    story: 'Some of our Playbook members asked: "Can you just build the whole thing for us?" So we created a white-glove service where our agent swarm builds your entire system in 48 hours.',
    offer: 'Complete AI automation system: sales bot + funnel + follow-up + dashboard + 90-day optimization',
    price: '$5,000-$25,000',
    conversionTarget: '10-20% of core buyers',
    color: 'border-purple-500/30',
  },
];

const ATTRACTIVE_CHARACTERS = [
  { type: 'The Leader', desc: 'You\'ve been there, done that. You lead from experience.', example: 'Alex Hormozi style — "I\'ve built $100M+ businesses, here\'s what I learned"' },
  { type: 'The Adventurer', desc: 'You\'re exploring the frontier and sharing discoveries.', example: 'Nate Herk style — "I just discovered this insane Claude Code trick..."' },
  { type: 'The Reporter', desc: 'You interview experts and distill their wisdom.', example: '"I talked to 50 AI founders and here\'s what they all do differently"' },
  { type: 'The Reluctant Hero', desc: 'You didn\'t want to teach this, but felt obligated.', example: '"I wasn\'t going to share this, but too many people are struggling with..."' },
];

export default function FunnelPage() {
  const [funnel, setFunnel] = useState(DEFAULT_FUNNEL);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const selected = funnel.find(s => s.id === selectedStage);

  function updateStage(id: string, updates: Partial<FunnelStage>) {
    setFunnel(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }

  return (
    <div className="text-white space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
            Funnel Builder
          </h1>
          <p className="text-sm text-gray-500 mt-1">Russell Brunson's Value Ladder + Hook-Story-Offer framework</p>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            editMode ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          {editMode ? 'Done Editing' : 'Edit Funnel'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Value Ladder Visual */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-400 mb-4">Value Ladder</h2>
          <div className="space-y-3">
            {[...funnel].reverse().map((stage, i) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                className={`w-full text-left p-5 rounded-xl border transition-all hover:shadow-lg ${stage.color} ${
                  selectedStage === stage.id ? 'ring-2 ring-purple-500 bg-gray-800/50' : 'bg-gray-900'
                }`}
                style={{ marginLeft: `${(3 - i) * 24}px`, width: `calc(100% - ${(3 - i) * 24}px)` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 font-mono">L{funnel.length - i}</span>
                    <h3 className="text-sm font-bold text-white">{stage.name}</h3>
                  </div>
                  <span className="text-lg font-bold text-green-400">{stage.price}</span>
                </div>
                <p className="text-xs text-gray-400">{stage.hook}</p>
                <p className="text-[10px] text-gray-600 mt-1">Target: {stage.conversionTarget}</p>
              </button>
            ))}
          </div>

          {/* Selected Stage Detail */}
          {selected && (
            <div className="mt-6 bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h2 className="text-lg font-bold text-white mb-4">{selected.name} — Hook, Story, Offer</h2>

              <div className="space-y-4">
                {/* Hook */}
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                  <p className="text-xs text-red-400 uppercase font-semibold mb-2">Hook (grabs attention)</p>
                  {editMode ? (
                    <textarea value={selected.hook} onChange={e => updateStage(selected.id, { hook: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-purple-500" rows={2} />
                  ) : (
                    <p className="text-sm text-gray-300 italic">"{selected.hook}"</p>
                  )}
                </div>

                {/* Story */}
                <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <p className="text-xs text-yellow-400 uppercase font-semibold mb-2">Story (creates belief — Epiphany Bridge)</p>
                  {editMode ? (
                    <textarea value={selected.story} onChange={e => updateStage(selected.id, { story: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-purple-500" rows={3} />
                  ) : (
                    <p className="text-sm text-gray-300">{selected.story}</p>
                  )}
                </div>

                {/* Offer */}
                <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <p className="text-xs text-green-400 uppercase font-semibold mb-2">Offer (converts)</p>
                  {editMode ? (
                    <textarea value={selected.offer} onChange={e => updateStage(selected.id, { offer: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-purple-500" rows={2} />
                  ) : (
                    <p className="text-sm text-gray-300">{selected.offer}</p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Price:</span>
                    {editMode ? (
                      <input value={selected.price} onChange={e => updateStage(selected.id, { price: e.target.value })} className="w-32 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-green-400 text-right focus:outline-none focus:border-purple-500" />
                    ) : (
                      <span className="text-xl font-bold text-green-400">{selected.price}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Attractive Character */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Attractive Character Archetypes</h3>
            <p className="text-[10px] text-gray-500 mb-3">Pick one persona for all your funnel copy (Brunson):</p>
            <div className="space-y-3">
              {ATTRACTIVE_CHARACTERS.map(ac => (
                <div key={ac.type} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <p className="text-sm font-bold text-white">{ac.type}</p>
                  <p className="text-xs text-gray-400 mt-1">{ac.desc}</p>
                  <p className="text-[10px] text-gray-600 mt-1 italic">{ac.example}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dream 100 */}
          <div className="bg-gray-900 rounded-xl border border-blue-500/20 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Dream 100 Strategy</h3>
            <p className="text-xs text-gray-400 mb-3">Where your ideal customers already congregate:</p>
            <div className="space-y-2 text-xs">
              {[
                { channel: 'YouTube', action: 'Comment on Nate Herk, Hormozi, Brunson videos' },
                { channel: 'Twitter/X', action: 'Engage with AI automation threads' },
                { channel: 'LinkedIn', action: 'Connect with agency owners posting about AI' },
                { channel: 'Skool', action: 'Join AI/automation communities' },
                { channel: 'Reddit', action: 'r/ClaudeAI, r/automation, r/SaaS' },
              ].map(d => (
                <div key={d.channel} className="flex gap-2">
                  <span className="text-blue-400 w-16 shrink-0">{d.channel}</span>
                  <span className="text-gray-500">{d.action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brunson Quote */}
          <div className="bg-gray-900 rounded-xl border border-yellow-500/20 p-4">
            <p className="text-xs text-yellow-400 italic leading-relaxed">
              "You're one funnel away."
            </p>
            <p className="text-[10px] text-gray-600 mt-2">— Russell Brunson</p>
          </div>
        </div>
      </div>
    </div>
  );
}
