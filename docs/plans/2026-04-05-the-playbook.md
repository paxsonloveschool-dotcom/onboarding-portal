# THE PLAYBOOK — AI Business Automation Operating System

> Synthesized from: Nate Herk (AI/Claude Code), OpenClaw, Jeremy Miner (NEPQ), Ryan Serhant (FRO),
> Alex Hormozi ($100M Offers), Russell Brunson (Funnels), Frank Kern (IBB) + GOD MODE v2 Agent Swarm

---

## PART 1: THE STACK (What Runs Everything)

### Layer Architecture

```
┌─────────────────────────────────────────────────┐
│  LAYER 6: DEPLOYMENT & SCALE                    │
│  Vercel / Railway / AWS — auto-deploy pipelines │
├─────────────────────────────────────────────────┤
│  LAYER 5: AGENT SWARM (GOD MODE v2)            │
│  Orchestrator → Implementers → Reviewers        │
│  9-stage pipeline, 36 skills, 14 guards         │
├─────────────────────────────────────────────────┤
│  LAYER 4: AI SALES ENGINE                       │
│  NEPQ bot, lead scoring, behavioral triggers    │
├─────────────────────────────────────────────────┤
│  LAYER 3: FUNNEL SYSTEM                         │
│  Value Ladder, Hook-Story-Offer, 4-Day Machine  │
├─────────────────────────────────────────────────┤
│  LAYER 2: OFFER ARCHITECTURE                    │
│  Grand Slam Offers, Value Equation pricing      │
├─────────────────────────────────────────────────┤
│  LAYER 1: FOUNDATION                            │
│  Next.js app, database, auth, CRM integration   │
└─────────────────────────────────────────────────┘
```

---

## PART 2: OFFER DESIGN (Hormozi Framework)

### The Value Equation

```
Value = (Dream Outcome × Perceived Likelihood) / (Time Delay × Effort & Sacrifice)
```

**Implementation in Claude Code:**

| Variable | How AI Maximizes It |
|----------|-------------------|
| Dream Outcome ↑ | AI delivers the full result, not just tools |
| Perceived Likelihood ↑ | "Results in Advance" — free AI audit proves competence |
| Time Delay ↓ | Agent swarm builds in hours, not weeks |
| Effort & Sacrifice ↓ | Client does nothing — agents handle everything |

### Grand Slam Offer Template

```yaml
offer:
  name: "AI Business Automation System"
  core_promise: "We build your entire sales + operations system in 48 hours"
  delivery: "Agent swarm builds it live while you watch"
  
  components:
    - name: "AI Sales Agent"
      description: "NEPQ-trained chatbot that qualifies leads 24/7"
      value: "$15,000"
      
    - name: "Automated Funnel"
      description: "Full value ladder from lead magnet to high-ticket"
      value: "$10,000"
      
    - name: "Follow-Up Engine"
      description: "Behavioral-triggered sequences (email + SMS)"
      value: "$5,000"
      
    - name: "Content Repurposing Pipeline"
      description: "1 video → 30 pieces of content across all platforms"
      value: "$8,000"
      
    - name: "Live Dashboard"
      description: "Real-time metrics, lead flow, revenue tracking"
      value: "$3,000"
  
  bonuses:
    - "30-day optimization sprint (AI monitors and improves automatically)"
    - "Swarm dashboard access (watch your agents work)"
    - "Weekly AI strategy call"
  
  guarantee: "If we don't generate ROI in 90 days, we work for free until we do"
  
  price: "$5,000"  # vs $41,000 stacked value
  
  pricing_model: "outcome"  # NOT hourly, NOT per-seat
```

### Agent Task: Offer Builder

```
Claude Code command: "Build a Grand Slam Offer for [niche]"

Agent flow:
1. Research agent → Analyze niche, competitors, pricing
2. Hormozi agent → Apply Value Equation, stack components
3. Copywriter agent → Write offer page with Hook-Story-Offer
4. Pricing agent → Calculate outcome-based price point
5. Review agent → Validate against Hormozi principles
```

---

## PART 3: SALES ENGINE (Miner NEPQ Framework)

### NEPQ Question Sequence for AI Sales Bot

The AI sales agent follows Jeremy Miner's Neuro-Emotional Persuasion Questions:

```yaml
nepq_sequence:
  stage_1_situation:
    purpose: "Understand where they are now"
    questions:
      - "What does your current [process] look like?"
      - "How long have you been handling [pain point] this way?"
      - "Walk me through what happens when a new [lead/client/order] comes in"
    tonality: "curious, genuine interest"
    
  stage_2_problem_awareness:
    purpose: "Surface the pain they've been tolerating"
    questions:
      - "What's the biggest challenge with [their current process]?"
      - "How much time does your team spend on [manual task] each week?"
      - "What happens when [failure scenario] occurs?"
    tonality: "concerned, empathetic"
    
  stage_3_solution_awareness:
    purpose: "Help them see what's possible"
    questions:
      - "What would it look like if [pain point] was handled automatically?"
      - "If you could get back those [X hours/week], what would you do with them?"
      - "Have you looked into any solutions for this?"
    tonality: "hopeful, exploratory"
    
  stage_4_consequence:
    purpose: "Emotional weight of NOT acting"
    questions:
      - "What happens if nothing changes in the next 6 months?"
      - "How does this affect [their team / their revenue / their growth]?"
      - "At what point does this become unsustainable?"
    tonality: "serious, caring"
    
  stage_5_commitment:
    purpose: "Transition to solution"
    questions:
      - "If I could show you a way to [solve pain] without [sacrifice], would that be worth exploring?"
      - "What would need to be true for you to move forward with something like this?"
    tonality: "confident but detached"

  disqualification_frame:
    trigger: "When prospect hesitates"
    script: "Honestly, this might not be the right fit for you — we typically work with [ideal client profile]. Does that sound like your situation?"
    purpose: "Prospect argues FOR why they qualify"
```

### Agent Implementation

```
Agents involved:
🤖 NEPQ Sales Bot — Runs the question sequence in chat/voice
📊 Lead Scorer — Rates leads based on responses (1-10)
🎯 Qualifier — Routes hot leads to calendar, warm to nurture
📧 Follow-Up Agent — Serhant FRO sequences post-call
```

---

## PART 4: FUNNEL SYSTEM (Brunson Framework)

### The Value Ladder

```
                    ┌──────────────┐
                    │  HIGH TICKET │ $5K-$25K
                    │  Done-For-You│ AI System Build
                    │  Automation  │
                ┌───┴──────────────┴───┐
                │    CORE OFFER        │ $997-$2,997
                │    Course / Template │ AI Playbook + Templates
                │    + Community       │
            ┌───┴──────────────────────┴───┐
            │      TRIPWIRE                │ $27-$97
            │      Mini-Course / Tool      │ Single AI Automation
            │      Quick Win               │
        ┌───┴──────────────────────────────┴───┐
        │          LEAD MAGNET (FREE)          │
        │          AI Audit / Free Report      │
        │          "Results In Advance"        │
        └──────────────────────────────────────┘
```

### Hook-Story-Offer Framework (Every Page)

```yaml
hook_story_offer:
  hook:
    pattern: "[Shocking result] in [short timeframe] without [expected sacrifice]"
    examples:
      - "We built a $50K/mo sales system in 48 hours with zero employees"
      - "This AI agent closed 47 deals while the founder slept"
      - "From 0 to automated in a weekend — here's the blueprint"
      
  story:
    framework: "epiphany_bridge"  # Brunson's Epiphany Bridge
    structure:
      - backstory: "I was manually doing [painful thing]..."
      - wall: "Then I hit a wall — [breaking point]..."
      - epiphany: "That's when I discovered [agent swarms / AI automation]..."
      - transformation: "Within [timeframe], everything changed..."
      - proof: "[Specific metrics, screenshots, results]"
      
  offer:
    structure:
      - what_you_get: "List every component with individual value"
      - bonuses: "Time-limited bonus stack"
      - guarantee: "Risk reversal (Hormozi style)"
      - cta: "Single clear action"
      - urgency: "Real scarcity (limited builds per month)"
```

### Dream 100 Strategy (Automated)

```yaml
dream_100:
  agent: "Dream100 Researcher"
  process:
    1_identify:
      - "Find 100 influencers/communities in [target niche]"
      - "Rank by audience overlap and engagement"
      - "Track on platforms: YouTube, Twitter/X, LinkedIn, podcasts"
    2_infiltrate:
      - "AI monitors their content daily"
      - "Auto-generates relevant comments/replies"
      - "Identifies collaboration opportunities"
    3_integrate:
      - "Pitch agent drafts personalized outreach"
      - "Content agent creates value-first collabs"
      - "Track conversion from each Dream 100 source"
```

---

## PART 5: MARKETING ENGINE (Kern IBB + Serhant FRO)

### Intent-Based Branding (Kern)

```yaml
ibb_system:
  principle: "Every piece of content either generates a lead OR builds brand. Ideally both."
  
  content_matrix:
    direct_response:
      - "Lead magnet ads with CTA"
      - "Retargeting sequences"
      - "Email campaigns with behavioral triggers"
      
    brand_building:
      - "Educational content (no CTA, pure value)"
      - "Behind-the-scenes of agent swarms working"
      - "Client result showcases"
      
    hybrid:
      - "Free AI audit (delivers result + captures lead)"
      - "Live build streams (demonstrates skill + attracts leads)"
      - "Case study breakdowns with CTA"

  results_in_advance:
    description: "Give a real result before asking for money"
    implementations:
      - "Free AI website audit (agent scans site, generates report)"
      - "Free automation ROI calculator"
      - "Free sample automation (build one small workflow)"
      - "Free 'what would we automate' video walkthrough"
```

### 4-Day Cash Machine (Kern)

```yaml
four_day_machine:
  description: "Rapid revenue campaign for existing audience"
  
  day_1_story:
    subject: "I almost gave up on [thing]..."
    content: "Share personal story about the problem. No selling."
    agent: "Copywriter agent generates email + social posts"
    
  day_2_content:
    subject: "Here's exactly what changed..."
    content: "Share the solution with proof. Mention offer is coming."
    agent: "Content agent compiles proof/screenshots/metrics"
    
  day_3_offer:
    subject: "I built this for you"
    content: "Full Grand Slam Offer presentation. CTA to buy."
    agent: "Offer agent formats and sends across all channels"
    
  day_4_urgency:
    subject: "Last chance (not kidding)"
    content: "Final push with real scarcity. Deadline expires tonight."
    agent: "Urgency agent sends final sequence, disables links at midnight"
```

### FRO System (Serhant)

```yaml
fro_followup:
  description: "Follow-up, Relevance, Originality — on autopilot"
  
  follow_up:
    rules:
      - "Respond to inbound within 60 seconds (AI handles initial)"
      - "Follow up 7x before marking as cold"
      - "Each follow-up references previous interaction"
    sequence: [1h, 24h, 3d, 7d, 14d, 30d, 60d]
    
  relevance:
    rules:
      - "AI scans prospect's recent activity (social, website, email opens)"
      - "Dynamically adjusts messaging based on behavior"
      - "Seasonal/event triggers (hiring? expansion? funding?)"
      
  originality:
    rules:
      - "Never send the same template twice"
      - "AI generates unique angles per prospect"
      - "Mix media: text, video, voice note, meme, case study"
    
  speed_to_lead:
    target: "<60 seconds"
    implementation: "AI chatbot qualifies → books calendar → alerts human"
```

---

## PART 6: AGENT SWARM ARCHITECTURE (Nate Herk / OpenClaw / GOD MODE)

### The Full Swarm

```
🎯 MASTER ORCHESTRATOR
│
├── 📊 BUSINESS INTELLIGENCE SWARM
│   ├── 🔬 Market Researcher — niche analysis, competitor scanning
│   ├── 📈 Analytics Agent — tracks all KPIs, generates reports
│   └── 🎯 Dream 100 Agent — monitors and engages target influencers
│
├── 💰 SALES SWARM
│   ├── 🤖 NEPQ Sales Bot — runs qualification conversations
│   ├── 📋 Lead Scorer — rates and routes leads
│   ├── 📅 Calendar Agent — books qualified prospects
│   └── 📧 FRO Follow-Up Agent — Serhant-style sequences
│
├── 🎨 CONTENT SWARM
│   ├── ✍️ Copywriter Agent — Hook-Story-Offer for all content
│   ├── 🎬 Video Script Agent — YouTube, Reels, Shorts scripts
│   ├── 🔄 Repurposer Agent — 1 video → 30 pieces
│   └── 📱 Social Agent — posts, engages, monitors mentions
│
├── 🏗️ BUILD SWARM (GOD MODE v2 Pipeline)
│   ├── 🔨 Implementer Agents — TDD, pattern-matched code
│   ├── 📋 Spec Reviewers — binary PASS/FAIL
│   ├── 🔍 Quality Reviewers — code quality classification
│   └── 🔬 Research Agents — codebase + GitHub + design
│
├── 📬 CAMPAIGN SWARM
│   ├── 📧 Email Agent — drip sequences, 4-Day Cash Machine
│   ├── 📱 SMS Agent — time-sensitive triggers
│   ├── 🎯 Retargeting Agent — ad audience management
│   └── 🏷️ Offer Agent — Grand Slam Offer assembly + pricing
│
└── 🛡️ OPERATIONS SWARM
    ├── 📊 Dashboard Agent — real-time metrics and alerts
    ├── 🔒 Security Agent — monitors for issues
    ├── 💳 Billing Agent — invoicing, payment tracking
    └── 🎓 Onboarding Agent — new client setup automation
```

### Agent Communication Protocol

```yaml
agent_messaging:
  format:
    from: "agent_id"
    to: "agent_id"
    type: "task | result | escalation | query"
    payload:
      task_spec: "Full context, never reference files"
      priority: "critical | high | normal | low"
      deadline: "ISO timestamp"
    
  trust_rules:
    - "Orchestrator NEVER trusts agent self-reports"
    - "All claims verified by running commands directly"
    - "Fresh reviewer instance for every re-review"
    - "Max 3 retries per gate, then escalate to human"
```

---

## PART 7: IMPLEMENTATION PLAYBOOK

### Phase 1: Foundation (Week 1)

```yaml
tasks:
  - "Set up Next.js app with auth, database, CRM integration"
  - "Configure GOD MODE v2 in CLAUDE.md"
  - "Build swarm dashboard (already done: /godmode)"
  - "Set up MCP servers for external integrations"
  
agents_needed: 4 (orchestrator + 3 implementers)
```

### Phase 2: Offer + Funnel (Week 2)

```yaml
tasks:
  - "Build landing page with Hook-Story-Offer (Brunson)"
  - "Create lead magnet — free AI audit tool (Kern Results In Advance)"
  - "Set up Value Ladder pages (free → tripwire → core → high-ticket)"
  - "Configure payment processing + checkout"
  
agents_needed: 6 (orchestrator + content writer + 3 implementers + reviewer)
```

### Phase 3: Sales Engine (Week 3)

```yaml
tasks:
  - "Build NEPQ sales chatbot (Miner framework)"
  - "Create lead scoring system"
  - "Set up FRO follow-up sequences (Serhant)"
  - "Configure calendar booking automation"
  - "Build behavioral trigger engine (Kern IBB)"
  
agents_needed: 8 (orchestrator + NEPQ bot + 4 implementers + 2 reviewers)
```

### Phase 4: Content + Marketing (Week 4)

```yaml
tasks:
  - "Build content repurposing pipeline"
  - "Set up Dream 100 monitoring"
  - "Configure 4-Day Cash Machine templates (Kern)"
  - "Build social media automation"
  - "Set up retargeting infrastructure"
  
agents_needed: 7 (orchestrator + content swarm of 4 + 2 implementers)
```

### Phase 5: Scale + Optimize (Ongoing)

```yaml
tasks:
  - "A/B test offer variations (Hormozi)"
  - "Optimize NEPQ sequences based on close rates"
  - "Expand Dream 100 network"
  - "Add new funnel stages based on data"
  - "Performance tuning (LCP <2.5s, conversion >3%)"
  
agents_needed: "Full swarm on autopilot"
```

---

## PART 8: KEY METRICS TO TRACK

```yaml
metrics:
  top_of_funnel:
    - "Lead magnet downloads/signups per day"
    - "Cost per lead (CPL)"
    - "Dream 100 engagement rate"
    
  middle_of_funnel:
    - "NEPQ bot qualification rate"
    - "Speed to lead (target: <60s)"
    - "Follow-up sequence open/reply rates"
    - "Calendar booking rate"
    
  bottom_of_funnel:
    - "Close rate by offer tier"
    - "Average deal size"
    - "Revenue per lead"
    - "Guarantee claim rate"
    
  operations:
    - "Agent swarm uptime"
    - "Tasks completed per day"
    - "Quality gate pass rate"
    - "Escalation frequency"
    
  content:
    - "Pieces published per week"
    - "Engagement rate by platform"
    - "Content → lead conversion"
```

---

## PART 9: CLAUDE CODE QUICK COMMANDS

```bash
# Launch full pipeline
"Build a Grand Slam Offer for [niche] using Hormozi's Value Equation"

# Sales automation
"Create an NEPQ sales bot with Miner's 5-stage question sequence for [product]"

# Content machine
"Take this video transcript and repurpose into 30 pieces of content using Hook-Story-Offer"

# Campaign launch
"Run a 4-Day Cash Machine campaign for [offer] to [audience size] email list"

# Funnel build
"Build a complete Value Ladder funnel from lead magnet to high-ticket for [niche]"

# Dream 100
"Research and rank the top 100 influencers in [niche] by audience overlap"

# Follow-up
"Set up Serhant FRO sequences for all unconverted leads from the past 30 days"

# Audit
"Run a full AI audit on [website] and generate a Results In Advance report"
```

---

## SOURCES & INFLUENCES

| Person | Framework | Core Principle |
|--------|-----------|---------------|
| **Alex Hormozi** | $100M Offers, Value Equation | Make offers so good people feel stupid saying no |
| **Jeremy Miner** | NEPQ, 7th Level | Questions > pitches. Let prospects sell themselves |
| **Russell Brunson** | Funnels, Hook-Story-Offer | Value Ladder ascension. Every page: Hook → Story → Offer |
| **Frank Kern** | IBB, Results In Advance | Give a real result first. Behavior > demographics |
| **Ryan Serhant** | FRO, Speed to Lead | Follow-up, Relevance, Originality. First responder wins |
| **Nate Herk** | Agent Swarms, OpenClaw | Multi-agent orchestration. Claude Code as the engine |

---

*This playbook is designed to be implemented entirely through Claude Code agent swarms.
Each section maps to specific agents, specific frameworks, and specific commands.
The GOD MODE v2 pipeline ensures quality at every step.*
