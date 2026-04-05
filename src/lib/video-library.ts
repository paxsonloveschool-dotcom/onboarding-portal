// Master list of all video IDs from the playbook influences
// Organized by category for the library dashboard

export interface VideoEntry {
  id: string;
  category: string;
  influence: string;
  notes?: string;
}

export const VIDEO_LIBRARY: VideoEntry[] = [
  // ─── Nate Herk / AI Automation / Claude Code ───────────────
  { id: 'MAFHmyURRXo', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'boilaC1Qo2c', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'xeUhKuJbeWQ', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'ST2ROUFbdvU', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'FCGpgPZqmkY', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: '49V-5Ock8LU', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'Adl5_lJfkEE', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'XifgHi9R5Rc', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: '62Rfe1w9NBc', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'DPuZafJ6UEs', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'cq6GGKKZRJE', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'AL_7VqZEqD4', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'TZUTe7s11-I', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'vFepZE_wrfg', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'VbPOU7o_vug', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: '0Tch0N5nsRU', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'cL26BqArCaQ', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: '2Gvxb9DrBD8', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'VvYCVfoYuMk', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'Vc6O1C83n7A', category: 'AI & Claude Code', influence: 'Nate Herk' },
  { id: 'BXWpzOIVctI', category: 'AI & Claude Code', influence: 'Nate Herk', notes: 'YouTube Short' },

  // ─── OpenClaw / Agent Swarms ───────────────────────────────
  { id: 'bzWI3Dil9Ig', category: 'Agent Swarms', influence: 'OpenClaw', notes: 'My Multi-Agent Team with OpenClaw' },
  { id: 'tR2RCzEJn7w', category: 'Agent Swarms', influence: 'Nate Herk' },
  { id: 'uva9eqn2Mr4', category: 'Agent Swarms', influence: 'Nate Herk' },
  { id: '89CQRxq0YSg', category: 'Agent Swarms', influence: 'Nate Herk' },

  // ─── AI Security / Hacking / Advanced ──────────────────────
  { id: '_yfiUQSbdPY', category: 'AI Advanced', influence: 'Various' },
  { id: 'Qvx2sVgQ-u0', category: 'AI Advanced', influence: 'Various' },
  { id: '44EJUYMSpzU', category: 'AI Advanced', influence: 'Various' },
  { id: '9ALYfGEOsAk', category: 'AI Advanced', influence: 'Various' },
  { id: 'KmpQMzYJfHM', category: 'AI Advanced', influence: 'Various' },

  // ─── AI Tools & Terminal ───────────────────────────────────
  { id: 'MsQACpcuTkU', category: 'AI Tools', influence: 'NetworkChuck', notes: 'AI in the Terminal Changes EVERYTHING' },
  { id: 'AO5aW01DKHo', category: 'AI Tools', influence: 'Various' },
  { id: 'q0TgUtj6vIs', category: 'AI Tools', influence: 'Various' },
  { id: 'mDsyFrQPPfg', category: 'AI Tools', influence: 'Various' },
  { id: 'kFwzPJZoZoc', category: 'AI Tools', influence: 'Various' },

  // ─── Business / Sales / Marketing ──────────────────────────
  { id: 'tnsrnsy_Lus', category: 'Business & Sales', influence: 'Various' },
  { id: 'MUDvwqJWWIw', category: 'Business & Sales', influence: 'Various' },
  { id: '5BmB-KymwCI', category: 'Business & Sales', influence: 'Various' },
  { id: 'rlJovzVhlIo', category: 'Business & Sales', influence: 'Various' },
  { id: 'NSwl_E0WWKk', category: 'Business & Sales', influence: 'Various' },
  { id: 'Q46OLxFshAQ', category: 'Business & Sales', influence: 'Various' },

  // ─── Strategy / Mindset ────────────────────────────────────
  { id: 'Y3PcRp5RFzk', category: 'Strategy', influence: 'Various' },
  { id: 'hpMrTabldEY', category: 'Strategy', influence: 'Various' },
  { id: 'ocQ7ZKhHU5Q', category: 'Strategy', influence: 'Various' },
  { id: 'o1i4FgtXhLA', category: 'Strategy', influence: 'Various' },
  { id: 'o-pMCoVPN_k', category: 'Strategy', influence: 'Various' },
  { id: 'eaNA2oOXoUg', category: 'Strategy', influence: 'Various' },
  { id: '8dqqa0dLpGU', category: 'Strategy', influence: 'Various' },
  { id: 'mBHRPeg8zPU', category: 'Strategy', influence: 'Various' },
  { id: 'pX1FAISTi7M', category: 'Strategy', influence: 'Various' },
  { id: 'w9-gfaV5vlM', category: 'Strategy', influence: 'Various' },
  { id: '9q5ojtkqsBs', category: 'Strategy', influence: 'Various' },
  { id: 'O1As2zxy0es', category: 'Strategy', influence: 'Various' },
];

// Deduplicated IDs for API calls
export function getUniqueVideoIds(): string[] {
  return [...new Set(VIDEO_LIBRARY.map(v => v.id))];
}

// Get categories
export function getCategories(): string[] {
  return [...new Set(VIDEO_LIBRARY.map(v => v.category))];
}

// Influences
export const INFLUENCES = [
  { name: 'Nate Herk', role: 'AI Automation / Claude Code / OpenClaw', channel: '@nateherk' },
  { name: 'Jeremy Miner', role: 'NEPQ Sales / 7th Level Communications', channel: '@JeremyMiner' },
  { name: 'Ryan Serhant', role: 'Sales / Personal Branding / FRO', channel: '@RyanSerhant' },
  { name: 'Alex Hormozi', role: '$100M Offers / Value Equation', channel: '@AlexHormozi' },
  { name: 'Russell Brunson', role: 'Funnels / Hook-Story-Offer', channel: '@RussellBrunson' },
  { name: 'Frank Kern', role: 'IBB / Results In Advance', channel: '@FrankKern' },
  { name: 'NetworkChuck', role: 'AI in the Terminal / DevOps', channel: '@NetworkChuck' },
  { name: 'OpenClaw', role: 'Multi-Agent Teams / Claude Code', channel: '' },
];
