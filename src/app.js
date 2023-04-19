const express = require('express');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ hello: 'world' });
});

app.use(routes);

module.exports = app;
