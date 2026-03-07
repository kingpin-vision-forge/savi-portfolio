/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = Number(process.env.WEBHOOK_PORT || 4000);
const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || '';
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'incoming-messages.jsonl');

app.use(express.json());

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const verifyToken = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && verifyToken === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

const collectMessages = (payload) => {
  const messages = payload?.entry?.[0]?.changes?.[0]?.value?.messages;
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .map((message) => ({
      from: message?.from || '',
      body: message?.text?.body || '',
      messageId: message?.id || '',
      receivedAt: new Date().toISOString(),
    }))
    .filter((message) => message.from && message.body);
};

app.post('/webhook', (req, res) => {
  const messages = collectMessages(req.body);

  if (messages.length === 0) {
    return res.status(200).json({ received: true, saved: 0 });
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const jsonLines = `${messages.map((message) => JSON.stringify(message)).join('\n')}\n`;
  fs.appendFileSync(DATA_FILE, jsonLines, 'utf8');

  for (const message of messages) {
    console.log(`[webhook] from=${message.from} body="${message.body}"`);
  }

  return res.status(200).json({ received: true, saved: messages.length });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Webhook listener running on port ${PORT}`);
});
