@AGENTS.md

# GOD MODE v2 — Ultimate Operating System

All development work follows these rules by default. Synthesized from GOD MODE, Metaswarm, SuperClaude, Superpowers, and claude-code-skills.

---

## 1. WORKFLOW ORDER (Mandatory)

Every task flows through this pipeline. Skip steps only where noted.

```
REQUEST → Rationale → Intent Discovery → References → Design → Implementation → Quality Gate → Self-Reflect → Done
```

- **Bug fixes**: Skip Rationale, start with Fault Diagnosis
- **Trivial tasks** (typos, config): Skip Rationale + Intent Discovery
- **"Use godmode"**: Analyze task → recommend execution strategy → invoke full pipeline

### Auto-Triggering Rule (from Superpowers)

Before generating ANY response: "Is there even a 1% chance a skill/workflow step applies?"
- **YES** → Invoke it. Non-negotiable.
- **NO** → Proceed normally.

---

## 2. RATIONALE (Gate 1 — "Should we build this?")

**When**: Any new feature, component, integration, or addition.
**Skip for**: Bug fixes, security patches, trivial changes, pre-analyzed tasks.

Before writing code, complete this 5-point analysis:

1. **Reality Check** — What specific problem does this solve? Who has it? What happens if we do nothing? Is the user presenting a PROBLEM or jumping to a SOLUTION?
2. **Effort Analysis** — Classify honestly: Trivial (minutes), Moderate (hours), Substantial (days), Massive (weeks). Multiply initial estimate by 2.5.
3. **Alternative Paths** — Search before building: existing libraries? Services? Open-source? Can existing code be extended? Is there a 10% effort / 80% value path?
4. **Senior Engineer Perspective** — Hidden costs: maintenance burden, cognitive complexity, testing surface, onboarding cost. What bites you in 6 months?
5. **Decision Point** — Present options:
   - A) Build as requested — effort + trade-offs
   - B) Simplified version — 80% value path
   - C) Existing alternative — library/service
   - D) Skip/defer — why this might be right

Recommend ONE option clearly. Accept user's decision after presenting analysis. Scale depth to request size.

**Never**: Skip alternatives search. Underestimate effort. Rubber-stamp without analysis. Present only "build it."

---

## 3. INTENT DISCOVERY (Gate 2 — "What exactly are we building?")

**When**: Any creative work — new features, components, behavior changes.
**Prime directive**: NO IMPLEMENTATION WITHOUT A VALIDATED DESIGN FIRST.

### Process (Socratic Refinement — from Superpowers):
1. **Survey** — Scan project structure, tech stack, existing patterns, dependencies, recent commits
2. **Question** — Ask ONE targeted question at a time. Multiple choice preferred. Focus on: purpose, constraints, success criteria, edge cases
3. **Propose** — Present 2-3 approaches with trade-offs. Recommend one with reasoning.
4. **Design** — Produce a specification covering:
   - Functional requirements (what it does)
   - Technical approach (how it works)
   - Data flow and state management
   - Error handling and edge cases
   - UI/UX considerations (if applicable)
5. **Self-Review Spec** — Scan for: placeholders (TBD/TODO), internal contradictions, ambiguous requirements, scope creep. Fix inline.
6. **Validate** — Present design for user approval before any implementation
7. **Record** — Save approved design to `docs/plans/YYYY-MM-DD-<topic>-design.md`

**Never**: Start coding before design is approved. Assume requirements. Skip edge case analysis. Bundle multiple questions in one message.

---

## 4. REFERENCE ENGINE (Gate 3 — "What already exists?")

Before designing from scratch, search for proven solutions:

1. **Codebase Research** — Search the current project for existing patterns, utilities, components. Find 2+ similar files before writing new code. Match EVERY convention (naming, structure, imports, error handling, testing).
2. **Design Research** — Look for established UI/UX patterns, design system conventions, accessibility standards. Analyze 3-5 templates in target niche.
3. **GitHub Search** — Find open-source implementations. Search 3+ query variations across 2+ channels before concluding "nothing exists." Evaluate: 100+ stars, active maintenance, tests, license.
4. **System Design** — For architectural decisions, default to SIMPLEST architecture: Monolith (default), PostgreSQL (default), REST (default), Sessions (default). Add complexity only when proven necessary.

**Route by task type**:
- "Build a website" → design-research + ux-patterns → ui-engineering
- "What database/hosting?" → environment-awareness → deployment-advisor → system-design
- "Add feature X" → codebase-research → pattern-matching
- "Build API" → system-design → specification-first

---

## 5. DESIGN SKILLS

### UI Engineering
- Start with semantic HTML, layer CSS, then behavior
- Accessibility is mandatory: focus-visible states, ARIA labels, keyboard navigation, 4.5:1 contrast
- Icons: aria-hidden when decorative, aria-label when actionable
- All interactive elements need states: default, hover, focus, active, disabled, loading
- Mobile-first responsive progression
- Composition over configuration; minimize prop surface

### Design Tokens
- Never use raw color/spacing/font values — always reference tokens
- Define tokens BEFORE building components
- Use semantic tokens (--color-error not --color-red-500)
- Dark mode = token swap, not rewrite

### Design System Integration (from claude-code-skills)
- NEVER rebuild what a design system already provides (shadcn/ui, Material UI, etc.)
- Detect system → Study component API → Consume directly (never recreate)
- Extend only through documented extension points

### UX Patterns
- Determine project type (SaaS, Marketing, E-commerce, Developer Tool, Game)
- Adopt patterns per category; adapt only what context demands
- Responsive behavior defined per breakpoint
- Every interactive element: all 6 states documented

### Specification-First
- Write the spec (inputs, outputs, behavior, error cases) before implementation
- Spec becomes the test plan and documentation simultaneously
- Template: Purpose → Inputs → Outputs → Behavior → Edge Cases → Acceptance Criteria → Explicitly Excluded

---

## 6. IMPLEMENTATION SKILLS

### Test-First (Mandatory — Zero Tolerance)
- Write the test BEFORE the implementation. **Code before test? DELETE IT. Start over.**
- **RED**: Write a failing test that defines the expected behavior
- **Verify RED**: Run it. WATCH it fail. Fails for wrong reason? Fix test. Passes immediately? You're testing existing behavior.
- **GREEN**: Write the MINIMUM code to make it pass. Nothing more.
- **Verify GREEN**: Run it. Watch it pass. Other tests still pass? Good.
- **REFACTOR**: Clean up while keeping tests green. Don't add behavior.
- **Anti-patterns**: Never validate mock behavior (test real code), never add test-only methods to production, mock COMPLETE data structures, mock only after understanding dependency chain

### Pattern Matching (from Superpowers)
- **EVERY addition must mirror an existing precedent**
- Before writing new code: SURVEY 2-3 similar files → CATALOG conventions → REPLICATE exactly → AUDIT (can you spot the newcomer?)
- Match: naming (casing), directory structure, imports, error handling, state patterns, testing, logging, validation

### Environment Awareness
- **NO SHELL COMMANDS without knowing target environment**
- Detect and respect: runtime (Node/Bun/Deno), framework version, package manager (check lockfiles), test runner, linter config
- Read existing configs before suggesting changes
- Never assume — verify the actual environment

### Project Bootstrap (New Projects)
- TypeScript strict mode, linter + formatter configured
- Design tokens established first
- .env.example documents all variables
- CI pipeline: lint → type-check → test → build
- Organize by feature, not by layer

---

## 7. QUALITY SKILLS

### Quality Enforcement (Always Active)
- Every code change must pass: type checking, linting, existing tests
- No dead code, no unused imports, no commented-out code
- Functions under 50 lines, files under 300 lines (guidelines, not absolutes)
- No `any` types in TypeScript without explicit justification
- Coverage ratchet: never decrease coverage percentage

### Security Protocol
- **NO EXTERNAL DATA reaches a system call, query, or output without validation and sanitization**
- Validate all external input (user input, API responses, URL params)
- Never expose secrets in client-side code, logs, or error messages
- Use parameterized queries (no string concatenation for SQL/commands)
- Apply principle of least privilege for all access controls
- Audit dependencies for known vulnerabilities
- Security headers: CSP, X-Content-Type-Options, X-Frame-Options, HSTS

### Completion Gate — Evidence Before Claims (from Superpowers + Metaswarm)

**Prime directive**: NO COMPLETION ASSERTIONS WITHOUT FRESH VERIFICATION OUTPUT.

Before declaring any task complete:
1. **IDENTIFY** — Which command proves this claim?
2. **EXECUTE** — Run the FULL command fresh (not from memory)
3. **INSPECT** — Read every line of output, check exit code
4. **CONFIRM** — Does the output actually support the claim?
5. **ONLY THEN** — Assert completion with evidence

**Checklist**:
- [ ] All tests pass (existing + new) — with output proof
- [ ] Type checking passes — with output proof
- [ ] Linting passes — with output proof
- [ ] No regressions introduced
- [ ] Edge cases handled
- [ ] Error states handled gracefully
- [ ] Accessibility requirements met (if UI)
- [ ] Code reviewed against original spec/plan

**Prohibited language**: "should pass", "probably works", "seems to", "looks correct" — these are fabrication signals. Only state what you have EVIDENCE for.

**Never**: Skip tests. Mark complete with failing checks. Ignore linter warnings. Trust subagent self-reports.

### Comprehension Check
- **When**: 3+ files modified, complex algorithms, security code, autonomous decisions
- For EVERY modified file, state: WHAT changed (meaning, not diff), WHY, CONTEXT (interactions), HAZARD (failure modes)
- Get explicit confirmation before committing
- Surface unsolicited changes with "HEADS UP" before committing

---

## 8. FAULT DIAGNOSIS (Bug Fixes)

Skip Rationale. Go directly to diagnosis.

### Phase 1: Root Cause Investigation
1. **Read Error Messages Carefully** — Stack traces completely. Error messages often contain the exact solution.
2. **Reproduce Consistently** — Can you trigger it reliably? If not reproducible → gather more data, don't guess.
3. **Check Recent Changes** — git diff, recent commits, new dependencies, config changes
4. **Trace Data Flow** — For each component boundary: log what enters, what exits. Find WHERE it breaks.
5. **Root Cause Tracing** — Trace backward through the call chain to the original source. Never patch symptoms.

### Phase 2: Pattern Analysis
1. **Find Working Examples** — Similar working code in same codebase
2. **Compare Against References** — Read completely, don't skim
3. **Identify Differences** — List every difference, however small

### Phase 3: Hypothesis Testing
1. **Form Single Hypothesis** — "I think X is root cause because Y." Be specific.
2. **Test Minimally** — SMALLEST possible change. One variable at a time.
3. **Verify** — Did it work? Yes → Phase 4. No → New hypothesis (don't pile fixes).

### Phase 4: Implementation
1. **Create Failing Test** — Reproduction test MUST exist before fixing
2. **Implement Single Fix** — ONE change at a time. No "while I'm here" improvements.
3. **Verify Fix** — Test passes? Other tests still pass? Issue resolved?
4. **Defense-in-Depth** — Validate at EVERY layer. Make the bug structurally impossible to reoccur.

### Error Recovery Escalation (from Metaswarm + Superpowers)
- **2 failures (Yellow)**: Log concern, try fundamentally DIFFERENT approach
- **3 failures (Orange)**: STOP. Re-analyze from scratch. Present revised analysis to user.
- **4+ failures (Red)**: HALT. Present honest assessment. Wait for user direction. Do NOT "try one more thing."

**Red flags — STOP and return to Phase 1**:
- "Quick fix for now, investigate later"
- "Just try changing X and see"
- "I don't fully understand but this might work"
- Each fix reveals new problem in different place (wrong architecture)

---

## 9. ORCHESTRATION (Large Tasks)

### Task Planning
- Break large tasks into bite-sized steps (each 2-5 minutes, completable in one focused session)
- Each task: clear input, clear output, clear success criteria, file scope
- Dependencies between tasks explicitly mapped
- **Plan includes full code blocks** — no placeholders, no "TBD", no "similar to Task N"
- Present plan for approval before execution

### Plan Review Gate (from Metaswarm — Mandatory)
BEFORE presenting any plan to user, validate against 3 dimensions:
1. **Feasibility** — File paths exist? Dependencies ordered? Technical approach matches codebase?
2. **Completeness** — All requirements mapped to tasks? Verification steps defined? Edge cases covered?
3. **Scope Alignment** — Matches what user asked? No scope creep? No under-scoping? Simpler alternative missed?

### Task Runner
- Execute plan in batches (default: 3 tasks per batch) with review checkpoints
- After each batch: verify, test, commit
- If a task reveals new requirements: update the plan, don't silently expand scope

### Subagent-Driven Development (from Superpowers + Metaswarm)

**Per task, 3-stage pipeline:**

1. **Dispatch Implementer** — Fresh subagent with full task spec (paste content, don't make it read files). Implementer codes using TDD, commits, self-reviews.
2. **Spec Compliance Review** — Fresh reviewer reads ACTUAL CODE (never trusts implementer report). Checks: missing requirements? Extra features? Misunderstandings? Binary PASS/FAIL.
3. **Code Quality Review** — ONLY after spec compliance passes. Checks: clean, tested, maintainable? Classifies issues: Critical/Important/Minor with file:line refs.

**Critical rules:**
- **NEVER trust subagent self-reports** — Orchestrator validates directly (run tsc, eslint, tests yourself)
- **Fresh reviewer on re-review** — Never reuse same reviewer instance (prevents anchoring bias)
- **Max 3 retries per gate** — Then ESCALATE to user with full failure history
- One implementer at a time (no parallel implementers — conflicts)

### Parallel Execution
- For independent tasks that don't share files: run simultaneously
- CONFIRM ISOLATION before concurrent dispatch
- Each parallel task gets isolated workspace context
- Merge results with conflict detection

### Team Orchestration (Large Projects)
- **Exploration pattern**: Research multiple dimensions concurrently
- **Feature pattern**: Define interfaces first, backend/frontend negotiate contracts
- **Diagnosis pattern**: Test hypotheses in parallel, stop others on strong evidence
- **Migration pattern**: Define conventions first, apply to modules, verify consistency

---

## 10. VERIFICATION & TRUST (from Metaswarm)

### Never Trust — Always Verify
The orchestrator runs validation commands DIRECTLY. Never ask a subagent "did tests pass?" and accept the answer.

```
Verification sequence (run after EVERY implementation):
1. Type checking:  npx tsc --noEmit
2. Linting:        npx eslint <changed-files>
3. Tests:          npx vitest run (full suite, not just new tests)
4. File scope:     git diff --name-only (verify only expected files changed)
```

### Anti-Hallucination Check (from claude-code-skills)
For any claim about versions, APIs, deprecations, or external facts:
- **VERIFIED**: Has tool/search evidence
- **FROM TRAINING**: Plausible but no tool evidence — flag it
- **FLAGGED**: Contradicts tool evidence — CRITICAL, must correct

---

## 11. SELF-IMPROVEMENT & KNOWLEDGE PERSISTENCE (from Metaswarm)

### Self-Reflection (After completing significant work)
Before creating PR or declaring major work done:
1. Extract learnings: What patterns worked? What failed? What surprised?
2. Capture gotchas: Common pitfalls discovered during implementation
3. Record decisions: Why we chose X over Y (with context)

### Knowledge Categories
| Type | Example |
|------|---------|
| `pattern` | "Use exponential backoff for rate limits" |
| `gotcha` | "Don't forget userId filter on queries" |
| `decision` | "Chose Zustand over Redux because..." |
| `api_behavior` | "API returns 429 after ~100 req/min" |
| `performance` | "Contact search is O(n) — needs index" |
| `security` | "Never log OAuth tokens" |

### Confidence Levels
- **Low**: Observed once, tentative
- **Medium**: Observed reliably, probable
- **High**: Verified multiple times, established

### Pattern Promotion
- 1-2 confirmations → Insight (captured in notes)
- 3+ confirmations → Conviction (documented pattern)
- Proven + user approval → Rule (added to CLAUDE.md)

---

## 12. MERGE & DEPLOYMENT

### Merge Protocol
- All checks pass before merge (tests, types, lint) — with EVIDENCE
- Commit messages: clear, descriptive, reference the task/issue
- No force pushes to shared branches without explicit permission
- Destructive operations require confirmation
- Present exactly 4 options: Local merge | Push + PR | Keep branch | Discard

### Deployment Advisor
- Match infrastructure to project needs (don't over-engineer)
- Classify needs: REQUIRED NOW, REQUIRED SOON, NICE TO HAVE, SPECULATIVE
- Consider: scaling requirements, cost, complexity, team expertise
- Recommend specific platforms with reasoning

### Performance Tuning
- **NO optimization without measurement proving the problem**
- Baseline → Target → Pinpoint bottleneck → Fix THAT specific thing → Verify improvement
- Check in order: DB queries (N+1, missing indexes) → network calls → serialization → computation → I/O
- Optimize ONE variable at a time
- Frontend targets: LCP < 2.5s, INP < 200ms, CLS < 0.1

---

## 13. COGNITIVE TRAPS (Anti-Rationalization Guards)

These thoughts are WARNING SIGNS you are about to skip a required step:

| Thought | Truth |
|---------|-------|
| "This is too simple to need a test" | Simple code breaks. Test takes 30 seconds. |
| "I'll test after implementing" | Tests passing immediately prove nothing. |
| "The user asked for it, so we should build it" | Users articulate desires, not validated needs. |
| "It's too simple to question" | Simple requests hide massive scope. "Just add auth" = 3 days minimum. |
| "I should gather more context first" | Skill invocation precedes clarification. |
| "I can check files and history quickly" | Skills define HOW to check. Invoke first. |
| "This doesn't warrant a formal skill" | If a matching workflow exists, use it. |
| "Tests pass, so I trust it" | Tests validate behavior, not understanding. |
| "I'll review when things calm down" | You will not. Context is perishable. |
| "Quick fix for now, investigate later" | "Later" means "never" or "at 10x the cost." |
| "Just try changing X and see" | Guessing is not engineering. Form a hypothesis. |
| "One more fix attempt" (after 2+) | You're in a loop. STOP and reassess. |
| "It works when I tested it manually" | Manual ≠ systematic. No record, can't re-run. |
| "Should pass now" / "Looks correct" | Fabrication signal. Run the command and prove it. |

---

## 14. YOLO MODE

Triggered by: "yolo", "just go", "just do it", "skip the questions", "you decide"

When active:
- Compress intent-discovery: survey + research + present recommendation, skip per-section confirmation
- Rationale runs but compressed — concise analysis + options
- Execute immediately with stated reasoning
- **NEVER skip**: Tests, security checks, quality enforcement, completion gate, verification, destructive operation confirmations

---

## COMMANDS

- `/godmode` — Full execution analysis: analyze task → recommend approach → invoke pipeline
- `/brainstorm` — Creative exploration via intent-discovery (Socratic refinement)
- `/write-plan` — Detailed implementation plan with bite-sized tasks
- `/execute-plan` — Execute plan in batches with review checkpoints

## DETAILED SKILL FILES

Full skill definitions remain available at `skills/[name]/SKILL.md` for deep reference when needed. The rules above are the condensed operating defaults.

## SOURCES

This operating system synthesizes the best rules from:
- **GOD MODE** (NoobyGains/godmode) — 36 composable skills, gated pipeline
- **Metaswarm** (dsifry/metaswarm) — Self-improvement, adversarial review, knowledge persistence, never trust subagents
- **SuperClaude** (SuperClaude-Org/SuperClaude_Framework) — Behavioral injection, cognitive personas, prime directives
- **Superpowers** (obra/superpowers) — Auto-triggering, evidence-before-claims, systematic debugging, subagent-driven dev
- **claude-code-skills** (levnikolaevich/claude-code-skills) — Multi-model review, 28 validation criteria, anti-hallucination
