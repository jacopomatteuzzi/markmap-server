const express = require('express');
const cors = require('cors');
const { Transformer } = require('markmap-lib');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

function getSVG(root, opts = {}) {
  // Funzione minimale per serializzare il dato Markmap in SVG
  // (ispirata a markmap-cli/lib/serve)
  const { embedAssets = true, ...rest } = opts;
  const assets = [
    '<style>.markmap{font-family:var(--markmap-font-family,Arial,sans-serif);}</style>'
  ];
  const data = JSON.stringify(root);
  return `
<svg class="markmap" width="800" height="600">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <script type="application/json" id="markmap-data">${data}</script>
    </div>
  </foreignObject>
  ${assets.join('\n')}
</svg>
  `;
}

app.post('/api/markmap-svg', async (req, res) => {
  const md = req.body.md || '';
  const transformer = new Transformer();
  const { root } = transformer.transform(md);
  const svg = getSVG(root);
  res.set('Content-Type', 'image/svg+xml');
  res.send(svg);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Markmap SVG server on port', PORT)); 