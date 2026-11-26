import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const script = fileURLToPath(new URL('../scripts/learning_navigator.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
const roles = {
  'account-manager': 'Opportunity brief',
  'solution-engineer': 'Pilot experiment',
  'ai-architect': 'Architecture decision record',
  'technical-consultant': 'Pilot statement of work',
  student: 'Evidence table',
  founder: 'Founder decision memo',
  creator: 'Editorial proof sheet',
  'enterprise-lead': 'Team adoption brief',
};

for (const [role, artifact] of Object.entries(roles)) {
  test(role + ' receives its own artifact, critique and transfer', () => {
    const actions = new Set();
    for (const stage of ['start', 'draft', 'revised']) {
      const result = run(role, stage);
      assert.equal(result.status, 0);
      const plan = JSON.parse(result.stdout);
      assert.equal(plan.artifact, artifact);
      assert.equal(plan.role, role);
      assert.equal(plan.stage, stage);
      assert.equal(plan.standing, 'self-directed-practice');
      assert.ok(plan.acceptance && plan.assignment && plan.scenario.brief);
      assert.equal(Boolean(plan.transfer), stage === 'revised');
      actions.add(plan.nextAction);
    }
    assert.equal(actions.size, 3);
  });
}

test('output is reproducible and invalid arguments never leak into the response', () => {
  assert.equal(run('student', 'start').stdout, run('student', 'start').stdout);
  assert.match(run('--help').stdout, /technical-consultant/);
  for (const args of [[], ['student'], ['constructor', 'start'], ['student', '__proto__'], ['student', 'draft', 'private-note']]) {
    const result = run(...args);
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.doesNotMatch(result.stderr, /private-note/);
  }
});

test('student transfer changes the supported answer for a two-day approved request', () => {
  const plan = JSON.parse(run('student', 'revised').stdout);
  assert.match(plan.scenario.rules[0], /up to two days.*with manager approval/);
  assert.match(plan.scenario.questions[0], /two days with manager approval/);
  assert.match(plan.transfer, /changes to one day/);
});

test('solution engineer transfer introduces an offline latency requirement', () => {
  const plan = JSON.parse(run('solution-engineer', 'revised').stdout);
  assert.doesNotMatch(plan.scenario.brief, /under two seconds|no network/);
  assert.match(plan.transfer, /under two seconds.*no network/);
});

test('worksheets carry the source case and role criterion without revealing a later transfer', () => {
  for (const role of Object.keys(roles)) {
    const revised = JSON.parse(run(role, 'revised').stdout);
    const sheet = run(role, 'start', '--worksheet');
    assert.equal(sheet.status, 0);
    for (const text of [revised.scenario.brief, ...revised.scenario.questions, ...revised.scenario.rules,
      revised.artifact, revised.assignment, revised.acceptance, 'First attempt (keep the original wording):']) {
      assert.ok(sheet.stdout.includes(text));
    }
    assert.ok(!sheet.stdout.includes(revised.transfer));
    assert.ok(run(role, 'revised', '--worksheet').stdout.includes(revised.transfer));
  }
});
