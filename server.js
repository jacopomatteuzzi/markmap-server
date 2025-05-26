const express = require('express');
const cors = require('cors');
const { Transformer } = require('markmap-lib');
const { getMarkmapSVG } = require('markmap-cli/lib/serve');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api/markmap-svg', async (req, res) => {
  const md = req.body.md || '';
  const transformer = new Transformer();
  const { root, features } = transformer.transform(md);
  const svg = getMarkmapSVG(root, { features });
  res.set('Content-Type', 'image/svg+xml');
  res.send(svg);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Markmap SVG server on port', PORT)); 