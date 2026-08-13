// Prompt Library prototype — tiny static server (no deps).
// Run:  node app/serve.js   →   http://localhost:5173
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname;
// take the port from the environment so the harness can assign a free one
const port = Number(process.env.PORT) || 5183;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.md': 'text/markdown; charset=utf-8' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const file = path.join(root, p);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('404'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log('Prompt Library → http://localhost:' + port));
