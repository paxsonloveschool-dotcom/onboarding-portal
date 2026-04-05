'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────
type Stage = 'situation' | 'problem' | 'solution' | 'consequence' | 'commitment' | 'complete';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  stage: Stage;
  tonality?: string;
}

interface Lead {
  name: string;
  score: number;
  stage: Stage;
  answers: Record<string, string>;
}

// ─── NEPQ Question Bank ──────────────────────────────────────
const NEPQ_STAGES: {
  id: Stage;
  name: string;
  purpose: string;
  tonality: string;
  color: string;
  questions: string[];
  disqualification?: string;
}[] = [
  {
    id: 'situation',
    name: 'Stage 1: Situation',
    purpose: 'Understand where they are now',
    tonality: 'Curious, genuine interest',
    color: 'text-blue-400',
    questions: [
      "Hey! Thanks for reaching out. I'd love to learn more about what you're working on. What does your current process look like for handling [your main challenge]?",
      "Got it. How long have you been handling things this way?",
      "Walk me through what happens when a new lead or client comes in — what's the flow?",
    ],
  },
  {
    id: 'problem',
    name: 'Stage 2: Problem Awareness',
    purpose: 'Surface the pain they\'ve been tolerating',
    tonality: 'Concerned, empathetic',
    color: 'text-orange-400',
    questions: [
      "What would you say is the biggest challenge with your current setup?",
      "How much time does your team spend on that each week? Roughly?",
      "And what happens when things slip through the cracks? Has that been an issue?",
    ],
  },
  {
    id: 'solution',
    name: 'Stage 3: Solution Awareness',
    purpose: 'Help them see what\'s possible',
    tonality: 'Hopeful, exploratory',
    color: 'text-green-400',
    questions: [
      "What would it look like if that whole process was handled automatically?",
      "If you could get back those hours every week, what would you actually do with that time?",
      "Have you explored any solutions for this before? What worked, what didn't?",
    ],
  },
  {
    id: 'consequence',
    name: 'Stage 4: Consequence',
    purpose: 'Emotional weight of NOT acting',
    tonality: 'Serious, caring',
    color: 'text-red-400',
    questions: [
      "Here's what I'm curious about — what happens if nothing changes in the next 6 months?",
      "How does this affect your team's morale? Your revenue? Your growth?",
      "At what point does this become truly unsustainable?",
    ],
  },
  {
    id: 'commitment',
    name: 'Stage 5: Commitment',
    purpose: 'Transition to solution — with disqualification frame',
    tonality: 'Confident but detached',
    color: 'text-purple-400',
    questions: [
      "If I could show you a way to solve this without adding headcount or complexity, would that be worth a 15-minute deep dive?",
      "What would need to be true for you to move forward with something like this?",
    ],
    disqualification: "Honestly, this might not be the right fit for everyone — we typically work with businesses that are already generating revenue and just need to remove the manual bottlenecks. Does that sound like your situation?",
  },
];

// ─── Component ────────────────────────────────────────────────
export default function NEPQChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentStage, setCurrentStage] = useState<Stage>('situation');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [lead, setLead] = useState<Lead>({ name: '', score: 0, stage: 'situation', answers: {} });
  const [showDisqualify, setShowDisqualify] = useState(false);

  const stageData = NEPQ_STAGES.find(s => s.id === currentStage);
  const stageIndex = NEPQ_STAGES.findIndex(s => s.id === currentStage);

  function startConversation() {
    setIsStarted(true);
    const firstQ = NEPQ_STAGES[0].questions[0];
    setMessages([{
      id: 1,
      from: 'bot',
      text: firstQ,
      stage: 'situation',
      tonality: NEPQ_STAGES[0].tonality,
    }]);
  }

  function sendMessage() {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: messages.length + 1,
      from: 'user',
      text: input,
      stage: currentStage,
    };

    // Score the response (simple length + keyword heuristic)
    let scoreBoost = 1;
    const lower = input.toLowerCase();
    if (lower.includes('frustrated') || lower.includes('losing') || lower.includes('struggling')) scoreBoost = 3;
    if (lower.includes('need') || lower.includes('want') || lower.includes('help')) scoreBoost = 2;
    if (input.length > 100) scoreBoost += 1;

    const newLead = {
      ...lead,
      score: lead.score + scoreBoost,
      answers: { ...lead.answers, [`${currentStage}_${questionIndex}`]: input },
    };
    setLead(newLead);

    // Determine next question or advance stage
    const stage = NEPQ_STAGES.find(s => s.id === currentStage)!;
    let nextMessages = [userMsg];

    if (questionIndex < stage.questions.length - 1) {
      // Next question in same stage
      const nextQ = stage.questions[questionIndex + 1];
      nextMessages.push({
        id: messages.length + 2,
        from: 'bot',
        text: nextQ,
        stage: currentStage,
        tonality: stage.tonality,
      });
      setQuestionIndex(questionIndex + 1);
    } else if (stageIndex < NEPQ_STAGES.length - 1) {
      // Advance to next stage
      const nextStage = NEPQ_STAGES[stageIndex + 1];
      const transitionMsg: Message = {
        id: messages.length + 2,
        from: 'bot',
        text: nextStage.questions[0],
        stage: nextStage.id,
        tonality: nextStage.tonality,
      };
      nextMessages.push(transitionMsg);
      setCurrentStage(nextStage.id);
      setQuestionIndex(0);
      newLead.stage = nextStage.id;
    } else {
      // Conversation complete
      setCurrentStage('complete');
      nextMessages.push({
        id: messages.length + 2,
        from: 'bot',
        text: `Perfect. Based on everything you've shared, I think there's a real opportunity here. Let me put together a custom proposal for you. What's the best email to send that to?`,
        stage: 'complete',
      });
    }

    setMessages([...messages, ...nextMessages]);
    setInput('');
  }

  function triggerDisqualification() {
    const stage = NEPQ_STAGES.find(s => s.id === currentStage);
    if (stage?.disqualification) {
      setMessages([...messages, {
        id: messages.length + 1,
        from: 'bot',
        text: stage.disqualification,
        stage: currentStage,
        tonality: 'Detached, willing to walk away',
      }]);
      setShowDisqualify(false);
    }
  }

  function resetConversation() {
    setMessages([]);
    setInput('');
    setCurrentStage('situation');
    setQuestionIndex(0);
    setIsStarted(false);
    setLead({ name: '', score: 0, stage: 'situation', answers: {} });
    setShowDisqualify(false);
  }

  return (
    <div className="text-white space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            NEPQ Sales Bot
          </h1>
          <p className="text-sm text-gray-500 mt-1">Jeremy Miner's Neuro-Emotional Persuasion Questions — 5-stage flow</p>
        </div>
        {isStarted && (
          <button onClick={resetConversation} className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-400 hover:text-white transition">
            Reset
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          {!isStarted ? (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
              <h2 className="text-xl font-bold mb-2">NEPQ Sales Conversation Simulator</h2>
              <p className="text-sm text-gray-400 mb-6 max-w-lg mx-auto">
                Practice the 5-stage NEPQ framework. The bot asks questions following Miner's methodology.
                You respond as the prospect. Watch the lead score and stage progression in real time.
              </p>
              <button
                onClick={startConversation}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:from-blue-500 hover:to-purple-500 transition"
              >
                Start Conversation
              </button>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-xl border border-gray-800 flex flex-col h-[600px]">
              {/* Stage Progress Bar */}
              <div className="p-3 border-b border-gray-800">
                <div className="flex gap-1">
                  {NEPQ_STAGES.map((s, i) => (
                    <div key={s.id} className="flex-1">
                      <div className={`h-1.5 rounded-full transition-all ${
                        i < stageIndex ? 'bg-green-500' :
                        i === stageIndex ? 'bg-yellow-400' :
                        'bg-gray-700'
                      }`} />
                      <p className={`text-[9px] mt-1 text-center ${
                        i === stageIndex ? s.color : 'text-gray-600'
                      }`}>{s.name.replace('Stage ', '').replace(/: .*/, '')}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
                      msg.from === 'bot'
                        ? 'bg-gray-800 text-gray-200'
                        : 'bg-purple-600 text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      {msg.tonality && (
                        <p className="text-[9px] text-gray-500 mt-1 italic">Tonality: {msg.tonality}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              {currentStage !== 'complete' ? (
                <div className="p-3 border-t border-gray-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && sendMessage()}
                      placeholder="Respond as the prospect..."
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium hover:bg-purple-500 transition"
                    >
                      Send
                    </button>
                    {currentStage === 'commitment' && (
                      <button
                        onClick={triggerDisqualification}
                        className="px-3 py-2 bg-red-600/20 border border-red-500/30 rounded-lg text-xs text-red-400 hover:bg-red-600/30 transition"
                        title="Trigger disqualification frame"
                      >
                        DQ Frame
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 border-t border-gray-800 bg-green-500/5">
                  <p className="text-sm text-green-400 text-center font-medium">
                    Conversation complete — Lead scored {lead.score}/30
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Lead Score */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Lead Score</h3>
            <div className="text-center">
              <p className={`text-4xl font-bold ${
                lead.score >= 20 ? 'text-green-400' :
                lead.score >= 10 ? 'text-yellow-400' :
                'text-gray-400'
              }`}>{lead.score}</p>
              <p className="text-xs text-gray-500 mt-1">
                {lead.score >= 20 ? 'HOT — Book immediately' :
                 lead.score >= 10 ? 'WARM — Keep nurturing' :
                 'COLD — More discovery needed'}
              </p>
            </div>
            <div className="mt-3 w-full bg-gray-800 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  lead.score >= 20 ? 'bg-green-500' :
                  lead.score >= 10 ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}
                style={{ width: `${Math.min((lead.score / 30) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Current Stage */}
          {stageData && (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Current Stage</h3>
              <p className={`text-sm font-bold ${stageData.color}`}>{stageData.name}</p>
              <p className="text-xs text-gray-400 mt-1">{stageData.purpose}</p>
              <div className="mt-2 p-2 bg-gray-800 rounded">
                <p className="text-[10px] text-gray-500">Tonality:</p>
                <p className="text-xs text-gray-300 italic">{stageData.tonality}</p>
              </div>
            </div>
          )}

          {/* NEPQ Framework Reference */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">NEPQ Framework</h3>
            <div className="space-y-2">
              {NEPQ_STAGES.map((s, i) => (
                <div key={s.id} className={`flex items-center gap-2 text-xs ${
                  i === stageIndex ? s.color + ' font-bold' : 'text-gray-600'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    i < stageIndex ? 'bg-green-500' :
                    i === stageIndex ? 'bg-yellow-400 animate-pulse' :
                    'bg-gray-700'
                  }`} />
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Miner Quote */}
          <div className="bg-gray-900 rounded-xl border border-blue-500/20 p-4">
            <p className="text-xs text-blue-400 italic leading-relaxed">
              "The person asking the questions is the person in control of the conversation."
            </p>
            <p className="text-[10px] text-gray-600 mt-2">— Jeremy Miner</p>
          </div>
        </div>
      </div>
    </div>
  );
}
