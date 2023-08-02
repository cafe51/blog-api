const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    instruções: 'A api está pronta para uso! Você precisa estar logado, siga a documentação da api para conhecer os endpoints',
    frontEnd: 'Para acessar o front-end que eu criei para essa aplicação você pode acessar o link: https://japhe.vercel.app/blogapi',
    documentação: 'https://github.com/cafe51/blog-api#como-usar-a-api',
  });
});

app.use(routes);

module.exports = app;
