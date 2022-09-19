const express = require('express');
const path = require('path');
const vite = require('vite');
const app = express();

const viteServer = vite.createServer({
  server: { middlewareMode: true }
});

app.use(viteServer.middlewares);

app.get('/api', (req, res) => {
  res.json({ message: 'It works!' });
});
/*app.get('/', (req,res)=>{
  res.sendFile('index.html',{root:__dirname})
})*/
app.get('/', async (req, res, next) => {
  try {
    let html = fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8')

    // Transform HTML using Vite plugins.
    html = await viteServer.transformIndexHtml(req.url, html)

    res.send(html)
  } catch (e) {
    return next(e)
  }
})

app.listen(5000, () => console.log('listening on port 5000'));

module.exports = app;