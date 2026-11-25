import { readFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync(new URL(
  '../skills/connect-ai-architect/references/professional-practice.json', import.meta.url
), 'utf8'));

const args = process.argv.slice(2);
const [role, stage] = args;
const usage = [
  'Usage: node scripts/learning_navigator.mjs ROLE STAGE',
  'Roles: ' + Object.keys(catalog.roles).join(', '),
  'Stages: ' + Object.keys(catalog.stages).join(', '),
].join('\n');

if (args.length === 1 && role === '--help') {
  console.log(usage);
} else if (args.length !== 2 || !Object.hasOwn(catalog.roles, role) || !Object.hasOwn(catalog.stages, stage)) {
  console.error(usage);
  process.exitCode = 1;
} else {
  const route = catalog.roles[role];
  console.log(JSON.stringify({
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
  }, null, 2));
}
