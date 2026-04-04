@AGENTS.md

# GOD MODE — Default Operating System

All development work follows these rules by default. No per-turn file reads needed — everything is inline.

---

## 1. WORKFLOW ORDER (Mandatory)

Every task flows through this pipeline. Skip steps only where noted.

```
REQUEST → Rationale → Intent Discovery → References → Design → Implementation → Quality Gate → Done
```

- **Bug fixes**: Skip Rationale, start with Fault Diagnosis
- **Trivial tasks** (typos, config): Skip Rationale + Intent Discovery
- **"Use godmode"**: Analyze task → recommend execution strategy → invoke full pipeline

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

### Process:
1. **Survey** — Scan project structure, tech stack, existing patterns, dependencies
2. **Question** — Ask targeted questions about requirements, edge cases, constraints
3. **Design** — Produce a specification covering:
   - Functional requirements (what it does)
   - Technical approach (how it works)
   - Data flow and state management
   - Error handling and edge cases
   - UI/UX considerations (if applicable)
4. **Validate** — Present design for user approval before any implementation

**Never**: Start coding before design is approved. Assume requirements. Skip edge case analysis.

---

## 4. REFERENCE ENGINE (Gate 3 — "What already exists?")

Before designing from scratch, search for proven solutions:

1. **Codebase Research** — Search the current project for existing patterns, utilities, components that solve similar problems. Reuse before creating.
2. **Design Research** — Look for established UI/UX patterns, design system conventions, accessibility standards.
3. **GitHub Search** — Find open-source implementations, libraries, and patterns. Evaluate: stars, maintenance status, license, bundle size.
4. **System Design** — For architectural decisions, research proven patterns (microservices, event-driven, CQRS, etc.)

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

### Design Tokens
- Never use raw color/spacing/font values — always reference tokens
- Define tokens BEFORE building components
- Use semantic tokens (--color-error not --color-red-500)
- Dark mode = token swap, not rewrite

### UX Patterns
- Determine project type (SaaS, Marketing, E-commerce, Developer Tool, Game)
- Adopt patterns per category; adapt only what context demands
- Responsive behavior defined per breakpoint
- Every interactive element: all 6 states documented

### Specification-First
- Write the spec (inputs, outputs, behavior, error cases) before implementation
- Spec becomes the test plan and documentation simultaneously

---

## 6. IMPLEMENTATION SKILLS

### Test-First (Mandatory)
- Write the test BEFORE the implementation
- RED: Write a failing test that defines the expected behavior
- GREEN: Write the minimum code to make it pass
- REFACTOR: Clean up while keeping tests green
- **Anti-patterns to avoid**: Never validate mock behavior (test real code), never add test-only methods to production, mock COMPLETE data structures, mock only after understanding dependency chain

### Pattern Matching
- Before writing new code, search the codebase for similar patterns
- Follow existing conventions (naming, structure, error handling)
- If introducing a new pattern, document WHY it differs

### Environment Awareness
- Detect and respect: runtime (Node/Bun/Deno), framework version, package manager, test runner, linter config
- Read existing configs before suggesting changes
- Never assume — verify the actual environment

### Project Bootstrap (New Projects)
- TypeScript strict mode, linter + formatter configured
- Design tokens established first
- .env.example documents all variables
- CI pipeline: lint → type-check → test → build

---

## 7. QUALITY SKILLS

### Quality Enforcement (Always Active)
- Every code change must pass: type checking, linting, existing tests
- No dead code, no unused imports, no commented-out code
- Functions under 50 lines, files under 300 lines (guidelines, not absolutes)
- No any types in TypeScript without explicit justification

### Security Protocol
- Validate all external input (user input, API responses, URL params)
- Never expose secrets in client-side code, logs, or error messages
- Use parameterized queries (no string concatenation for SQL/commands)
- Apply principle of least privilege for all access controls
- Audit dependencies for known vulnerabilities

### Completion Gate (Final Check)
Before declaring any task complete:
- [ ] All tests pass (existing + new)
- [ ] Type checking passes
- [ ] Linting passes
- [ ] No regressions introduced
- [ ] Edge cases handled
- [ ] Error states handled gracefully
- [ ] Accessibility requirements met (if UI)
- [ ] Code reviewed against original spec/plan

**Never**: Skip tests. Mark complete with failing checks. Ignore linter warnings.

### Comprehension Check
- After complex implementations, verify understanding by explaining the solution back
- If something feels wrong or unclear, pause and investigate rather than proceeding

---

## 8. FAULT DIAGNOSIS (Bug Fixes)

Skip Rationale. Go directly to diagnosis.

1. **Reproduce** — Confirm the bug exists with a failing test or clear reproduction steps
2. **Root Cause Tracing** — Trace backward through the call chain to the original source. Never patch symptoms.
3. **Condition-Based Waiting** — If timing-related: wait for actual conditions, never arbitrary delays. Poll every 10ms with clear timeout.
4. **Defense-in-Depth** — After fixing: validate at EVERY layer (entry point, business logic, environment guards). Make the bug structurally impossible to reoccur.
5. **Fix + Test** — Fix at source, add regression test, verify no regressions

### Error Recovery
- On repeated failures (3+ attempts): stop, reassess approach, consider alternative strategy
- Log what was tried and why it failed before switching approaches
- Never retry the same failing action without changing something

---

## 9. ORCHESTRATION (Large Tasks)

### Task Planning
- Break large tasks into bite-sized steps (each completable in one focused session)
- Each task: clear input, clear output, clear success criteria
- Dependencies between tasks explicitly mapped
- Present plan for approval before execution

### Task Runner
- Execute plan in batches with review checkpoints
- After each batch: verify, test, commit
- If a task reveals new requirements: update the plan, don't silently expand scope

### Delegated Execution (Subagents)
- For sequential multi-step tasks: dispatch to subagent with clear spec
- Spec reviewer audits compliance (reads actual code, not reports)
- Code quality reviewer classifies issues (Critical/Important/Minor) with file:line refs

### Parallel Execution
- For independent tasks that don't share files: run simultaneously
- Each parallel task gets isolated workspace context
- Merge results with conflict detection

### Team Orchestration (Large Projects)
- **Exploration pattern**: Research multiple dimensions concurrently
- **Feature pattern**: Define interfaces first, backend/frontend negotiate contracts
- **Diagnosis pattern**: Test hypotheses in parallel, stop others on strong evidence
- **Migration pattern**: Define conventions first, apply to modules, verify consistency

### Agent Messaging
- Agents communicate discoveries that cross domain boundaries
- Lead agent coordinates, resolves conflicts, maintains coherence

---

## 10. MERGE & DEPLOYMENT

### Merge Protocol
- All checks pass before merge (tests, types, lint)
- Commit messages: clear, descriptive, reference the task/issue
- No force pushes to shared branches without explicit permission
- Destructive operations require confirmation

### Deployment Advisor
- Match infrastructure to project needs (don't over-engineer)
- Consider: scaling requirements, cost, complexity, team expertise
- Recommend specific platforms with reasoning

### Performance Tuning
- Measure before optimizing (no premature optimization)
- Profile to find actual bottlenecks
- Optimize the critical path first
- Verify improvements with benchmarks

---

## 11. META

### Knowledge Capture
- After solving complex problems: document the solution, context, and reasoning
- Capture patterns that could be reused across the project

### Code Reviewer Agent
When a major implementation step completes, review against:
- Plan alignment, code quality, architecture, test coverage
- Classify issues: Critical (must fix), Important (should fix), Suggestions (nice to have)
- Clear verdict with rationale

---

## 12. YOLO MODE

Triggered by: "yolo", "just go", "just do it", "skip the questions", "you decide"

When active:
- Compress intent-discovery: survey + research + present recommendation, skip per-section confirmation
- Rationale runs but compressed — concise analysis + options
- Execute immediately with stated reasoning
- **NEVER skip**: Tests, security checks, quality enforcement, completion gate, destructive operation confirmations

---

## COMMANDS

- `/godmode` — Full execution analysis: analyze task → recommend approach → invoke pipeline
- `/brainstorm` — Creative exploration via intent-discovery
- `/write-plan` — Detailed implementation plan with bite-sized tasks
- `/execute-plan` — Execute plan in batches with review checkpoints

## DETAILED SKILL FILES

Full skill definitions remain available at `skills/[name]/SKILL.md` for deep reference when needed. The rules above are the condensed operating defaults.
