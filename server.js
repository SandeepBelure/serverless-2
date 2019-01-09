const express = require('express');
const next = require('next');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const mongoose = require('mongoose');
const initDb = require('./db');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const createServer = () => {
  const server = express();

  initDb();
  server.use(bodyParser.json());
  server.use(cors());
  server.use('/api', routes);

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });
  server.get('*', (req, res) => handle(req, res));

  return server;
};

const server = createServer();

if (!process.env.LAMBDA) {
  app.prepare().then(() => {
    server.listen(port, err => {
      if (err) throw err;
      console.log(`Ready on http://localhost:${port}`);
    });
  });
}

exports.app = app;
exports.server = server;
