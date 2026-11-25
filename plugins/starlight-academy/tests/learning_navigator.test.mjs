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
