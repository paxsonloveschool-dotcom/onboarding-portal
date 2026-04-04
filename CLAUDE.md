@AGENTS.md

# GOD MODE — Skill-Driven Development Framework

GOD MODE is active. All development work must flow through the skill system.

## Activation

@skills/activation/SKILL.md

## Available Skills

Skills live in `skills/[skill-name]/SKILL.md`. To invoke a skill, read its SKILL.md and follow its instructions exactly.

### Skill Catalog

| Category | Skills |
|----------|--------|
| **Core Workflow** | activation, rationale, intent-discovery, task-planning, task-runner, completion-gate |
| **Execution Patterns** | delegated-execution, parallel-execution, team-orchestration, agent-messaging, workspace-isolation |
| **Quality & Review** | quality-gate, review-response, quality-enforcement, comprehension-check |
| **Research & References** | reference-engine, github-search, codebase-research, design-research |
| **Development Practices** | test-first, specification-first, fault-diagnosis, error-recovery, merge-protocol, pattern-matching |
| **Architecture & Design** | system-design, ui-engineering, design-integration, ux-patterns |
| **Infrastructure** | project-bootstrap, environment-awareness, deployment-advisor, performance-tuning, security-protocol |
| **Meta** | protocol-authoring, knowledge-capture |

## Skill Invocation Order

1. **rationale** — challenge whether the work is worth doing (skip for bug fixes)
2. **intent-discovery** — explore requirements and design before implementation
3. **reference-engine** — locate proven solutions and patterns before building
4. **Design skills** — ui-engineering, design-integration, specification-first
5. **Implementation skills** — test-first, project-bootstrap, pattern-matching, environment-awareness
6. **Quality skills** — quality-enforcement, security-protocol, completion-gate, comprehension-check
7. **Orchestration skills** — team-orchestration, delegated-execution (for large tasks)

## Commands

- `/godmode` — Activate GOD MODE execution analysis (reads `commands/godmode.md`)
- `/brainstorm` — Run intent-discovery for creative exploration (reads `commands/brainstorm.md`)
- `/write-plan` — Create a detailed implementation plan (reads `commands/write-plan.md`)
- `/execute-plan` — Execute a plan in batches with review gates (reads `commands/execute-plan.md`)

## Agents

- **code-reviewer** — Senior code reviewer agent for validating completed work against plans (reads `agents/code-reviewer.md`)
