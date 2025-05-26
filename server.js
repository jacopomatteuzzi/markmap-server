const express = require('express');
const cors = require('cors');
const { Transformer, Markmap } = require('markmap-lib');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api/markmap-svg', async (req, res) => {
  const md = req.body.md || '';
  const transformer = new Transformer();
  const { root, features } = transformer.transform(md);

  // Genera SVG direttamente con Markmap
  const markmap = Markmap.create(null, null, root);
  const svg = markmap.svg();

  res.set('Content-Type', 'image/svg+xml');
  res.send(svg);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Markmap SVG server on port', PORT)); 