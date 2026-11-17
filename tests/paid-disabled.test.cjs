const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { load } = require('./load.cjs');

test('operator can disable paid AI while preserving public free recommendations', async () => {
  let calls = 0;
  class Provider { getGenerativeModel() { calls++; throw new Error('Paid provider must not run'); } }
  const route = load(path.resolve(__dirname, '../app/api/recommend/route.ts'), {
    GEMINI_API_KEY: 'synthetic-configured-key', PAID_AI_ENABLED: 'false',
  }, Provider);
  const response = await route.POST(new Request('https://example.test/api/recommend', {
    method: 'POST', body: JSON.stringify({ target: 'friend', situation: 'birthday', budget: 50000 }),
  }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).fallback, true);
  assert.equal(calls, 0);
});
