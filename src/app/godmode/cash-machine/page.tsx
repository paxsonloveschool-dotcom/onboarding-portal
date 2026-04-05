'use client';

import { useState } from 'react';

interface CampaignDay {
  day: number;
  name: string;
  subject: string;
  body: string;
  purpose: string;
  color: string;
  channels: string[];
}

const DEFAULT_CAMPAIGN: CampaignDay[] = [
  {
    day: 1,
    name: 'Story + Pain Point',
    subject: "I almost gave up on automation...",
    body: `Hey [Name],

Last year I was drowning. 60-hour weeks. Manually following up with every lead. Copy-pasting proposals. Updating spreadsheets at midnight.

I knew there had to be a better way, but every "solution" I tried either broke, cost a fortune, or required a PhD to set up.

Sound familiar?

I'm going to share something with you over the next few days that changed everything for me. No pitch today — just wanted to plant the seed.

Talk soon.`,
    purpose: 'Share personal story about the problem. NO selling. Build relatability.',
    color: 'border-blue-500/30',
    channels: ['Email', 'Social Post', 'Story/Reel'],
  },
  {
    day: 2,
    name: 'Content + Proof',
    subject: "Here's exactly what changed (with receipts)",
    body: `Hey [Name],

Remember yesterday when I said I was drowning in manual work?

Here's what changed: I discovered that AI agent swarms can handle 90% of the repetitive tasks in a business. Not chatbots — actual autonomous agents that:

• Qualify leads while you sleep (our bot closed 47 deals last month)
• Follow up with EVERY prospect (not just the ones you remember)
• Build proposals in minutes, not hours
• Track everything in real-time dashboards

Here are actual results from the last 90 days:
[Screenshot of metrics]
[Client testimonial]
[Before/after comparison]

Tomorrow I'm going to share something special I've been working on. Stay tuned.`,
    purpose: 'Share the solution with PROOF. Screenshots, metrics, testimonials. Mention offer is coming.',
    color: 'border-yellow-500/30',
    channels: ['Email', 'Social Post', 'YouTube Short', 'LinkedIn Post'],
  },
  {
    day: 3,
    name: 'The Offer',
    subject: "I built this for you (seriously)",
    body: `Hey [Name],

For the past 6 months, I've been building an AI automation system that handles:

✅ Lead qualification (NEPQ-trained sales bot)
✅ Automated funnels (from lead magnet to high-ticket)
✅ Follow-up sequences (behavioral triggers, never misses one)
✅ Content repurposing (1 video → 30 pieces)
✅ Live dashboard (see everything in real time)

Total value if you built this yourself: $41,000+
Hiring a team to run it: $8,000/month

Today through tomorrow only: $5,000

And here's my guarantee: If we don't generate positive ROI within 90 days, we work for free until we do.

[LINK TO OFFER PAGE]

This is limited to 10 builds this month (our agents can only handle so many concurrent projects).

[Name], if your business is generating revenue but you're drowning in manual work, this is the fastest path to freedom I've ever seen.

Let's build yours.`,
    purpose: 'Full Grand Slam Offer presentation. Clear CTA. Value stack. Guarantee. Scarcity.',
    color: 'border-green-500/30',
    channels: ['Email', 'Social Post', 'SMS', 'Retargeting Ad'],
  },
  {
    day: 4,
    name: 'Last Chance + Urgency',
    subject: "Last chance (not kidding — links die at midnight)",
    body: `Hey [Name],

Quick one — the AI automation system I shared yesterday closes tonight at midnight.

7 of 10 spots are already taken.

After tonight:
• Price goes back to $8,500
• No guarantee
• Next cohort isn't until [next month]

If you're on the fence, here's what one client said after week 2:

"I got back 25 hours/week and our close rate went from 12% to 31%. I wish I'd done this 6 months ago." — [Client Name]

[LINK TO OFFER PAGE]

This is the last email about this. No hard feelings either way.

But if your gut is telling you to go for it — trust it.

[Your name]

P.S. The guarantee still stands: positive ROI in 90 days or we work for free. You literally can't lose.`,
    purpose: 'Final push. Real scarcity. Social proof. Deadline. Risk reversal reminder.',
    color: 'border-red-500/30',
    channels: ['Email', 'SMS', 'Social Post', 'Retargeting Ad', 'Story Countdown'],
  },
];

export default function CashMachinePage() {
  const [campaign, setCampaign] = useState(DEFAULT_CAMPAIGN);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [campaignName, setCampaignName] = useState('AI Automation System Launch');
  const [listSize, setListSize] = useState(2500);
  const [avgOrderValue, setAvgOrderValue] = useState(5000);

  const selected = campaign.find(d => d.day === selectedDay);

  // Revenue projections
  const openRate = 0.25;
  const clickRate = 0.05;
  const conversionRate = 0.02;
  const projectedOpens = Math.round(listSize * openRate);
  const projectedClicks = Math.round(listSize * clickRate);
  const projectedSales = Math.round(listSize * conversionRate);
  const projectedRevenue = projectedSales * avgOrderValue;

  function updateDay(day: number, updates: Partial<CampaignDay>) {
    setCampaign(prev => prev.map(d => d.day === day ? { ...d, ...updates } : d));
  }

  return (
    <div className="text-white space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            4-Day Cash Machine
          </h1>
          <p className="text-sm text-gray-500 mt-1">Frank Kern's rapid revenue campaign — Story → Content → Offer → Urgency</p>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            editMode ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          {editMode ? 'Done' : 'Edit Copy'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Campaign Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Day Cards */}
          <div className="space-y-3">
            {campaign.map(day => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
                className={`w-full text-left p-5 rounded-xl border transition-all hover:shadow-lg bg-gray-900 ${day.color} ${
                  selectedDay === day.day ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-600">D{day.day}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{day.name}</h3>
                      <p className="text-xs text-gray-500">{day.purpose.split('.')[0]}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {day.channels.map(ch => (
                      <span key={ch} className="text-[9px] px-1.5 py-0.5 bg-gray-800 rounded text-gray-500">{ch}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 font-mono">Subject: {day.subject}</p>
              </button>
            ))}
          </div>

          {/* Selected Day Detail */}
          {selected && (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Day {selected.day}: {selected.name}</h2>
                <div className="flex gap-1">
                  {selected.channels.map(ch => (
                    <span key={ch} className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded">{ch}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Purpose:</p>
                <p className="text-sm text-gray-300">{selected.purpose}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Subject Line:</p>
                {editMode ? (
                  <input value={selected.subject} onChange={e => updateDay(selected.day, { subject: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                ) : (
                  <p className="text-sm text-yellow-400 font-medium">"{selected.subject}"</p>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Email Body:</p>
                {editMode ? (
                  <textarea value={selected.body} onChange={e => updateDay(selected.day, { body: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-purple-500" rows={16} />
                ) : (
                  <div className="bg-gray-800/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{selected.body}</pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Projections Sidebar */}
        <div className="space-y-4">
          {/* Revenue Projection */}
          <div className="bg-gray-900 rounded-xl border border-green-500/30 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Revenue Projection</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-500">Campaign Name</label>
                <input value={campaignName} onChange={e => setCampaignName(e.target.value)} className="w-full mt-1 px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500">Email List Size</label>
                <input type="number" value={listSize} onChange={e => setListSize(Number(e.target.value))} className="w-full mt-1 px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500">Avg Order Value ($)</label>
                <input type="number" value={avgOrderValue} onChange={e => setAvgOrderValue(Number(e.target.value))} className="w-full mt-1 px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white focus:outline-none focus:border-purple-500" />
              </div>

              <div className="border-t border-gray-800 pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Opens (25%)</span>
                  <span className="text-white">{projectedOpens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Clicks (5%)</span>
                  <span className="text-white">{projectedClicks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sales (2%)</span>
                  <span className="text-green-400 font-bold">{projectedSales}</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-2">
                  <span className="text-gray-500">Projected Revenue</span>
                  <span className="text-green-400 font-bold text-lg">${projectedRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* IBB Checklist */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Intent-Based Branding Checklist</h3>
            <div className="space-y-2 text-xs">
              {[
                'Each email tells a story (not just pitches)',
                'Social posts mirror email themes daily',
                'Retargeting ads hit non-openers on Day 3-4',
                'SMS triggers for cart abandoners on Day 4',
                'Results In Advance: free audit offered in P.S.',
                'Behavioral segments: opened vs clicked vs bought',
                'Omnipresence: prospect sees you on 3+ platforms',
              ].map((item, i) => (
                <label key={i} className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 accent-green-500" />
                  <span className="text-gray-400">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Kern Quote */}
          <div className="bg-gray-900 rounded-xl border border-green-500/20 p-4">
            <p className="text-xs text-green-400 italic leading-relaxed">
              "Give them a result in advance and they'll pay you for more."
            </p>
            <p className="text-[10px] text-gray-600 mt-2">— Frank Kern</p>
          </div>
        </div>
      </div>
    </div>
  );
}
