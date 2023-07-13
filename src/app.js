const cors = require('cors');
const express = require('express');
const routes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    instruções: 'A api está pronta para uso! Você precisa estar logado, siga a documentação da api para conhecer os endpoints',
    documentação: 'https://github.com/cafe51/blog-api#como-usar-a-api',
  });
});

app.use(routes);

module.exports = app;
