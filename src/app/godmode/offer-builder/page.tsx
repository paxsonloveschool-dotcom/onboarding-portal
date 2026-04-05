'use client';

import { useState } from 'react';

interface OfferComponent {
  id: string;
  name: string;
  description: string;
  value: number;
  included: boolean;
}

interface Bonus {
  id: string;
  text: string;
}

export default function OfferBuilderPage() {
  const [offerName, setOfferName] = useState('AI Business Automation System');
  const [corePromise, setCorePromise] = useState('We build your entire sales + operations system in 48 hours');
  const [guarantee, setGuarantee] = useState("If we don't generate ROI in 90 days, we work for free until we do");
  const [price, setPrice] = useState(5000);

  const [components, setComponents] = useState<OfferComponent[]>([
    { id: '1', name: 'AI Sales Agent', description: 'NEPQ-trained chatbot that qualifies leads 24/7', value: 15000, included: true },
    { id: '2', name: 'Automated Funnel', description: 'Full value ladder from lead magnet to high-ticket', value: 10000, included: true },
    { id: '3', name: 'Follow-Up Engine', description: 'Behavioral-triggered sequences (email + SMS)', value: 5000, included: true },
    { id: '4', name: 'Content Pipeline', description: '1 video → 30 pieces of content across all platforms', value: 8000, included: true },
    { id: '5', name: 'Live Dashboard', description: 'Real-time metrics, lead flow, revenue tracking', value: 3000, included: true },
  ]);

  const [bonuses, setBonuses] = useState<Bonus[]>([
    { id: '1', text: '30-day optimization sprint (AI monitors and improves automatically)' },
    { id: '2', text: 'Swarm dashboard access (watch your agents work in real time)' },
    { id: '3', text: 'Weekly AI strategy call for first 90 days' },
  ]);

  const [newComponent, setNewComponent] = useState({ name: '', description: '', value: 0 });
  const [newBonus, setNewBonus] = useState('');

  const totalValue = components.filter(c => c.included).reduce((sum, c) => sum + c.value, 0);
  const valueMultiplier = totalValue > 0 ? (totalValue / price).toFixed(1) : '0';

  // Value Equation scoring
  const dreamOutcome = Math.min(10, Math.floor(totalValue / 5000));
  const likelihood = guarantee.length > 20 ? 8 : 4;
  const timeDelay = corePromise.includes('48 hours') || corePromise.includes('weekend') ? 9 : 5;
  const effortScore = components.filter(c => c.included).length >= 4 ? 9 : 5;
  const valueScore = ((dreamOutcome * likelihood) / (((10 - timeDelay) + 1) * ((10 - effortScore) + 1))).toFixed(1);

  function toggleComponent(id: string) {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, included: !c.included } : c));
  }

  function addComponent() {
    if (!newComponent.name) return;
    setComponents(prev => [...prev, {
      id: String(Date.now()),
      ...newComponent,
      included: true,
    }]);
    setNewComponent({ name: '', description: '', value: 0 });
  }

  function removeComponent(id: string) {
    setComponents(prev => prev.filter(c => c.id !== id));
  }

  function addBonus() {
    if (!newBonus.trim()) return;
    setBonuses(prev => [...prev, { id: String(Date.now()), text: newBonus }]);
    setNewBonus('');
  }

  function removeBonus(id: string) {
    setBonuses(prev => prev.filter(b => b.id !== id));
  }

  return (
    <div className="text-white space-y-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
          Grand Slam Offer Builder
        </h1>
        <p className="text-sm text-gray-500 mt-1">Alex Hormozi's $100M Offers framework — build offers so good people feel stupid saying no</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Core Info */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400">Core Offer</h2>
            <div>
              <label className="text-xs text-gray-500">Offer Name</label>
              <input value={offerName} onChange={e => setOfferName(e.target.value)} className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Core Promise (the headline)</label>
              <input value={corePromise} onChange={e => setCorePromise(e.target.value)} className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Guarantee (risk reversal)</label>
              <input value={guarantee} onChange={e => setGuarantee(e.target.value)} className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Price ($)</label>
              <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500" />
            </div>
          </div>

          {/* Components */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-400 mb-4">Offer Components (Value Stack)</h2>
            <div className="space-y-2">
              {components.map(c => (
                <div key={c.id} className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                  c.included ? 'border-green-500/30 bg-green-500/5' : 'border-gray-700 bg-gray-800/50 opacity-50'
                }`}>
                  <button onClick={() => toggleComponent(c.id)} className={`w-5 h-5 rounded border flex items-center justify-center text-xs ${
                    c.included ? 'bg-green-500 border-green-500 text-white' : 'border-gray-600'
                  }`}>
                    {c.included && '✓'}
                  </button>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.description}</p>
                  </div>
                  <span className="text-sm font-mono text-gray-400">${c.value.toLocaleString()}</span>
                  <button onClick={() => removeComponent(c.id)} className="text-gray-600 hover:text-red-400 text-xs">✕</button>
                </div>
              ))}
            </div>

            {/* Add Component */}
            <div className="mt-4 flex gap-2">
              <input placeholder="Component name" value={newComponent.name} onChange={e => setNewComponent({ ...newComponent, name: e.target.value })} className="flex-1 px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500" />
              <input placeholder="Description" value={newComponent.description} onChange={e => setNewComponent({ ...newComponent, description: e.target.value })} className="flex-1 px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500" />
              <input type="number" placeholder="Value" value={newComponent.value || ''} onChange={e => setNewComponent({ ...newComponent, value: Number(e.target.value) })} className="w-24 px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500" />
              <button onClick={addComponent} className="px-3 py-1.5 bg-purple-600 rounded text-xs font-medium hover:bg-purple-500 transition">Add</button>
            </div>
          </div>

          {/* Bonuses */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-400 mb-4">Bonuses</h2>
            <div className="space-y-2">
              {bonuses.map(b => (
                <div key={b.id} className="flex items-center gap-3 p-2 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <span className="text-yellow-400 text-xs">🎁</span>
                  <span className="text-sm text-gray-300 flex-1">{b.text}</span>
                  <button onClick={() => removeBonus(b.id)} className="text-gray-600 hover:text-red-400 text-xs">✕</button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input placeholder="Add a bonus..." value={newBonus} onChange={e => setNewBonus(e.target.value)} onKeyDown={e => e.key === 'Enter' && addBonus()} className="flex-1 px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500" />
              <button onClick={addBonus} className="px-3 py-1.5 bg-purple-600 rounded text-xs font-medium hover:bg-purple-500 transition">Add</button>
            </div>
          </div>
        </div>

        {/* Preview + Metrics */}
        <div className="space-y-4">
          {/* Value Equation */}
          <div className="bg-gray-900 rounded-xl border border-red-500/30 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Hormozi Value Equation</h3>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-red-400">{valueScore}</p>
              <p className="text-xs text-gray-500">Value Score</p>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Dream Outcome</span>
                <span className="text-green-400">{dreamOutcome}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Perceived Likelihood</span>
                <span className="text-green-400">{likelihood}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time Delay (low = good)</span>
                <span className="text-blue-400">{10 - timeDelay}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Effort Required (low = good)</span>
                <span className="text-blue-400">{10 - effortScore}/10</span>
              </div>
            </div>
          </div>

          {/* Offer Summary */}
          <div className="bg-gray-900 rounded-xl border border-yellow-500/30 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Offer Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Components</span>
                <span className="text-white">{components.filter(c => c.included).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Bonuses</span>
                <span className="text-white">{bonuses.length}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-800 pt-2">
                <span className="text-gray-500">Stacked Value</span>
                <span className="text-yellow-400 font-bold">${totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Your Price</span>
                <span className="text-green-400 font-bold text-xl">${price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-800 pt-2">
                <span className="text-gray-500">Value Multiplier</span>
                <span className="text-purple-400 font-bold">{valueMultiplier}x</span>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-gray-900 rounded-xl border border-purple-500/30 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Offer Preview</h3>
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white">{offerName}</h4>
              <p className="text-sm text-gray-400 italic">"{corePromise}"</p>
              <div className="space-y-1">
                {components.filter(c => c.included).map(c => (
                  <p key={c.id} className="text-xs text-gray-400">✓ {c.name} <span className="text-gray-600">(${c.value.toLocaleString()} value)</span></p>
                ))}
              </div>
              {bonuses.length > 0 && (
                <div className="pt-2 border-t border-gray-800">
                  <p className="text-[10px] text-yellow-400 uppercase mb-1">Bonuses:</p>
                  {bonuses.map(b => (
                    <p key={b.id} className="text-xs text-gray-400">🎁 {b.text}</p>
                  ))}
                </div>
              )}
              <div className="pt-2 border-t border-gray-800">
                <p className="text-xs text-green-400">🛡️ {guarantee}</p>
              </div>
              <div className="pt-2 text-center">
                <p className="text-xs text-gray-600 line-through">${totalValue.toLocaleString()}</p>
                <p className="text-2xl font-bold text-green-400">${price.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Hormozi Quote */}
          <div className="bg-gray-900 rounded-xl border border-red-500/20 p-4">
            <p className="text-xs text-red-400 italic leading-relaxed">
              "Make people an offer so good they feel stupid saying no."
            </p>
            <p className="text-[10px] text-gray-600 mt-2">— Alex Hormozi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
