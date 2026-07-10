import test from 'node:test';
import assert from 'node:assert/strict';
import { buildProfessionalReply } from '../api/chat.js';

test('returns a more helpful fallback for unsupported questions', () => {
  const reply = buildProfessionalReply('How can I build an AI strategy for my nonprofit?');

  assert.match(reply.toLowerCase(), /i can help|more detail|tailored|contact|conversation|suggest/i);
});
