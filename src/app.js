const express = require('express');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS, PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    instruções: 'A api está pronta para uso! Você precisa estar logado, siga a documentação da api para conhecer os endpoints',
    documentação: 'https://github.com/cafe51/blog-api#como-usar-a-api',
  });
});

app.use(routes);

module.exports = app;
