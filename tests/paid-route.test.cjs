const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

const { load } = require('./load.cjs');

test('public paid route rejects missing credentials before spending tokens', async () => {
  let calls = 0;
  class Provider { getGenerativeModel() { return { generateContent: async () => {
    calls++; return { response: { text: () => JSON.stringify([1, 2, 3].map(id => ({
      id, name: 'n', reason: 'r', price: '1', cardMessage: 'c', emoji: 'a',
    }))) } };
  } }; } }
  const route = load(path.resolve(__dirname, '../app/api/recommend/route.ts'), {
    GEMINI_API_KEY: 'synthetic-not-a-provider-key', AI_ACCESS_TOKEN: 'a'.repeat(32),
  }, Provider);
  const response = await route.POST(new Request('https://example.test/api/recommend', {
    method: 'POST', body: JSON.stringify({ target: 'friend', situation: 'birthday', budget: 100 }),
  }));
  assert.equal(response.status, 401);
  assert.equal(calls, 0);
});
