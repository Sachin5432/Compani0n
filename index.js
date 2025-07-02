require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
// const { pipeline } = require('@xenova/transformers');

const app = express();
app.use(bodyParser.json());

// ─── Stubbed “load model” ───────────────────────────────────────
let generate;
async function initModel() {
  console.log('⚙️  Initialization: running in STUB mode (no real model)');
  // We aren’t loading any files yet—just reply with the prompt echoed back.
  generate = async (prompt) => {
    return `🤖 [stub]: I heard “${prompt}”`;
  };
}
// Call it immediately so `generate` is defined before any requests
initModel();

// ─── API endpoint ───────────────────────────────────────────────
app.post('/api/generate', async (req, res) => {
  const prompt = req.body.prompt || '';
  // If generate isn’t ready (shouldn’t happen here), return 503
  if (typeof generate !== 'function') {
    return res
      .status(503)
      .json({ error: 'Model not initialized. Please try again soon.' });
  }
  try {
    // Call our stub
    const text = await generate(prompt);
    res.json({ text });
  } catch (e) {
    console.error('Generation error:', e);
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server ▶ http://localhost:${PORT}`);
});
