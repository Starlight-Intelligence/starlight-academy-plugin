import { readFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync(new URL(
  '../skills/connect-ai-architect/references/professional-practice.json', import.meta.url
), 'utf8'));

function worksheet(plan) {
  const lines = [
    '# ' + plan.artifact,
    '',
    'Starlight Academy · Practice edition ' + plan.curriculumVersion,
    'Role: ' + plan.role + ' · Selected stage: ' + plan.stage,
    '',
    '## Case · ' + plan.scenario.name,
    plan.scenario.brief,
    '',
    ...plan.scenario.rules.map((rule, index) => '- Source ' + (index + 1) + ': ' + rule),
    '',
    ...plan.scenario.questions.map(question => '- ' + question),
    '',
    '## Your decision',
    plan.assignment,
    '',
    'Review criterion: ' + plan.acceptance,
    '',
    'Next exercise: ' + plan.nextAction,
  ];
  if (plan.transfer) lines.push('', 'Changed condition: ' + plan.transfer);
  lines.push('',
    '## My evidence',
    'Goal and available minutes:',
    'First attempt (keep the original wording):',
    'Source or assumption:',
    'Help I used:',
    'Reviewer observation:',
    'Revision and why it changed:',
    'Transfer response:',
    '',
    '## Continue in another conversation',
    'Keep this copy in your own files. Share only the sections you choose.',
    'Tell the next host: “Use this fictional case and my entries. Identify the first unfinished exercise. Ask one question. Keep my original answer intact.”',
    'When you have revised, open the revised route for this role to get its changed condition. The selected stage records your choice; it carries no assessment.'
  );
  return lines.join('\n');
}

const args = process.argv.slice(2);
const [role, stage, format] = args;
const usage = [
  'Usage: node scripts/learning_navigator.mjs ROLE STAGE [--worksheet]',
  'Roles: ' + Object.keys(catalog.roles).join(', '),
  'Stages: ' + Object.keys(catalog.stages).join(', '),
].join('\n');

if (args.length === 1 && role === '--help') {
  console.log(usage);
} else if ((args.length !== 2 && !(args.length === 3 && format === '--worksheet')) ||
           !Object.hasOwn(catalog.roles, role) || !Object.hasOwn(catalog.stages, stage)) {
  console.error(usage);
  process.exitCode = 1;
} else {
  const route = catalog.roles[role];
  const plan = {
    schema: 'starlight.learning_navigator.v1',
    curriculumVersion: catalog.version,
    standing: 'self-directed-practice',
    role, stage,
    scenario: catalog.case,
    artifact: route.artifact,
    assignment: route.attempt,
    nextAction: catalog.stages[stage],
    acceptance: route.acceptance,
    transfer: stage === 'revised' ? route.transfer : null,
  };
  console.log(format === '--worksheet' ? worksheet(plan) : JSON.stringify(plan, null, 2));
}
