import db from './db';

export interface UserContext {
  name: string;
  email: string;
  team: 'hp' | 'restore';
  role: 'employee' | 'admin';
  checklist: { title: string; description: string; completed: boolean }[];
  w9Submitted: boolean;
  documentsUploaded: { file_name: string; doc_type: string }[];
}

export function getUserContext(userId: string, team: string): UserContext {
  const user = db
    .prepare('SELECT name, email, role, team FROM users WHERE id = ?')
    .get(userId) as { name: string; email: string; role: string; team: string };

  const checklist = db
    .prepare(
      `SELECT ci.title, ci.description, COALESCE(cp.completed, 0) as completed
       FROM checklist_items ci
       LEFT JOIN checklist_progress cp ON ci.id = cp.checklist_item_id AND cp.user_id = ?
       WHERE ci.team = ?
       ORDER BY ci.order_num`
    )
    .all(userId, team) as { title: string; description: string; completed: number }[];

  const w9 = db
    .prepare('SELECT id FROM w9_submissions WHERE user_id = ? LIMIT 1')
    .get(userId) as { id: number } | undefined;

  const docs = db
    .prepare('SELECT file_name, doc_type FROM documents WHERE user_id = ?')
    .all(userId) as { file_name: string; doc_type: string }[];

  return {
    name: user.name,
    email: user.email,
    team: user.team as 'hp' | 'restore',
    role: user.role as 'employee' | 'admin',
    checklist: checklist.map((c) => ({
      title: c.title,
      description: c.description,
      completed: !!c.completed,
    })),
    w9Submitted: !!w9,
    documentsUploaded: docs,
  };
}

export function buildSystemPrompt(ctx: UserContext): string {
  const teamName = ctx.team === 'hp' ? 'HP Landscaping' : 'Restore';
  const completedCount = ctx.checklist.filter((c) => c.completed).length;
  const totalCount = ctx.checklist.length;
  const pendingItems = ctx.checklist
    .filter((c) => !c.completed)
    .map((c) => `- ${c.title}: ${c.description}`)
    .join('\n');
  const completedItems = ctx.checklist
    .filter((c) => c.completed)
    .map((c) => `- ${c.title}`)
    .join('\n');
  const uploadedDocs = ctx.documentsUploaded.length > 0
    ? ctx.documentsUploaded.map((d) => `- ${d.file_name} (${d.doc_type})`).join('\n')
    : 'None yet';

  return `You are the AI Personal Assistant for the ${teamName} employee onboarding portal. You work full-time as a helpful, proactive personal assistant for ${ctx.name}.

## Your Role
You are a dedicated personal assistant who helps employees navigate their onboarding process. You are friendly, professional, and always ready to help. You should be proactive in suggesting next steps and keeping the employee on track.

## Employee Profile
- Name: ${ctx.name}
- Email: ${ctx.email}
- Team: ${teamName}
- Role: ${ctx.role}

## Current Onboarding Progress (${completedCount}/${totalCount} complete)

### Pending Tasks:
${pendingItems || 'All tasks complete! 🎉'}

### Completed Tasks:
${completedItems || 'None yet'}

### W-9 Tax Form: ${ctx.w9Submitted ? 'Submitted ✓' : 'Not yet submitted'}

### Uploaded Documents:
${uploadedDocs}

## Portal Navigation Guide
You can direct the employee to these pages:
- Dashboard: /${ctx.team === 'hp' ? 'hp-landscaping' : 'restore'}/dashboard
- W-9 Form: /${ctx.team === 'hp' ? 'hp-landscaping' : 'restore'}/w9
- SOPs: /${ctx.team === 'hp' ? 'hp-landscaping' : 'restore'}/sops
- Documents: /${ctx.team === 'hp' ? 'hp-landscaping' : 'restore'}/documents
- Checklist: /${ctx.team === 'hp' ? 'hp-landscaping' : 'restore'}/checklist

## Guidelines
1. Always be aware of the employee's current progress and tailor your responses accordingly.
2. Proactively suggest what they should do next based on their pending tasks.
3. If they ask about a specific task, give clear step-by-step guidance.
4. Help them understand forms (W-9, etc.) and what documents they need.
5. Be encouraging and supportive - onboarding can feel overwhelming.
6. Keep responses concise but thorough.
7. If asked about something outside onboarding, be helpful but gently redirect to their onboarding tasks.
8. Use the portal navigation links to direct them to the right pages.
9. For W-9 form questions: explain what each field means, what SSN/EIN is needed, and that they need to sign it.
10. For document uploads: explain the required document types (government ID, certifications, insurance, etc.).

## Personality
You are warm, professional, and efficient. Think of yourself as a friendly coworker who knows everything about the onboarding process and is always available to help. Use a conversational tone but stay professional.`;
}
