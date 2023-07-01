# Boas-vindas ao repositório do projeto API para Blogs!

Olá, bem-vindo à API para Blogs! A api está funcionando online, basta acessar https://blog-api-japhe.up.railway.app/. Esta aplicação foi desenvolvida por mim, Japhé Nogueira, como um projeto para o curso de desenvolvimento web da Trybe. Este projeto é um sistema de back-end completo, robusto e eficiente desenvolvido para gerenciar todas as operações essenciais de um blog, incluindo o registro de usuários, autenticação, criação e gerenciamento de postagens.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como usar a API](#como-usar-a-api)
- [Funcionalidades da API](#funcionalidades-da-api)
- [Como configurar e executar o projeto](#como-configurar-e-executar-o-projeto)
- [Testes](#testes)
- [Conclusão](#conclusão)

## Sobre o Projeto

Esta API oferece um controle detalhado e personalizado sobre todas as operações de um blog. Pode-se facilmente registrar novos usuários, autenticá-los, permitir que eles criem, editem e excluam suas próprias postagens, classifiquem postagens em diferentes categorias e até mesmo permitam a criação de novas categorias.

## Tecnologias Utilizadas

Este projeto foi construído usando Node.js com o framework Express.js, proporcionando uma base sólida e eficiente para as operações de back-end. Também foi usado o Sequelize como ORM para interagir com o banco de dados MySQL, JWT para autenticação, Joi para validação e várias outras bibliotecas úteis.

As dependências incluem:

```
"dotenv": "^16.0.3",
"express": "^4.18.2",
"joi": "^17.9.1",
"jsonwebtoken": "^9.0.0",
"mysql2": "^3.2.3",
"sequelize": "^6.31.0"
```

E para o desenvolvimento foram utilizadas as seguintes dependências:
```
  "chai": "^4.3.7",
  "chai-http": "^4.3.0",
  "eslint": "^8.38.0",
  "eslint-config-airbnb-base": "^15.0.0",
  "eslint-plugin-import": "^2.27.5",
  "mocha": "^10.2.0",
  "nodemon": "^2.0.22",
  "sequelize-cli": "^6.6.0",
  "sinon": "^15.0.3"
  ```

---

## Como usar a API

Antes de começar, precisamos garantir que você está autenticado! Faça login em uma conta existente ou registre uma nova conta e você receberá um token que será necessário para acessar as outras rotas. Aqui estão algumas das operações principais que você pode realizar:

- Registre um novo usuário ou faça login em uma conta existente para começar.
- Acesse todos os usuários registrados ou procure um usuário específico por ID.
- Acesse a lista de todas as categorias registradas.
- Acesse a lista de todas as postagens do blog, procure uma postagem específica por ID ou use uma palavra-chave para pesquisar postagens.
- Crie um novo post para o blog ou registre uma nova categoria.
- Edite ou exclua suas próprias postagens.
- Exclua sua própria conta

Para obter detalhes específicos

 sobre como usar cada rota, confira a seção "Funcionalidades da API" abaixo.




## Funcionalidades da API

### Login e Cadastro

Comece logando em uma conta que já existe no banco de dados.

- O endpoint é acessível através da URL `https://blog-api-japhe.up.railway.app/login` no método `POST`;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  }
  ```

Será gerado um token que deverá ser usado para acessar as demais rotas.

Pode-se optar pelo cadastro de uma nova conta na seguinte rota:

- O endpoint é acessível através da URL `https://blog-api-japhe.up.railway.app/user` no método `POST`;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
- O campo "image" é opcional. Após o cadastro, também será gerado um token para acesso.

## Outras funcionalidades da API

Para acessar as demais funcionalidades da API, você precisa adicionar o token gerado ao cabeçalho das requisições. Seguem exemplos de como usar as demais rotas.

### Usuários
<br />

**Acesse os usuários cadastrados no banco de dados:**
- O endpoint é acessível através da URL `https://blog-api-japhe.up.railway.app/user` no método `GET`

**Procure um usuário por id:**
- O endpoint é acessível através da URL `https://blog-api-japhe.up.railway.app/user/:id` no método `GET`
- Substitua `:id` pelo id do usuário a ser acessado

---

### Categorias
<br />

**Acesse a lista de categorias cadastradas:**
- O endpoint é acessível através da URL `https://blog-api-japhe.up.railway.app/categories` no método `GET`

**Registre uma nova categoria:**
- O endpoint é acessível através da URL `https://blog-api-japhe.up.railway.app/categories` no método `POST`
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "name": "Typescript"
  }
  ```

---

### Posts
<br />

**Acesse a lista de todos os posts do blog:**
- O endpoint é acessível através da URL `https://blog-api-japhe.up.railway.app/post` no método `GET`

**Acesse um post do blog buscando pelo id:**
- O endpoint é acessível através da URL `https://blog-api-japhe.up.railway.app/post/:id` no método `GET`
- Substitua `:id` pelo id do post a ser acessado

**Pesquise um post do blog usando uma palavra chave:**
- O endpoint é acessível através da URL `https://blog-api-japhe.up.railway.app/post/search?q=:searchTerm` no método `GET`
- Substitua `:searchTerm` pela palavra a ser buscada

**Crie um novo post para o blog:**
- O endpoint é acessível através da URL `https://blog-api-japhe.up.railway.app/post` no método `POST`
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

**Edite um post do blog (você só pode editar posts de sua autoria):**
- O endpoint é acessível através do URL `https://blog-api-japhe.up.railway.app/post/:id` no método `PUT`
- Substitua `:id` pelo id do post a ser editado
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

**Delete um post do blog (você só pode deletar posts de sua autoria):**
- O endpoint é acessível através do URL `https://blog-api-japhe.up.railway.app/post/:id` no método `DELETE`
- Substitua `:id` pelo id do post a ser deletado

---

### Conta
**Delete sua própria conta (após deletar a própria conta você perderá o acesso a todas as funcionalidades do blog):**
- O endpoint é acessível através do URL `https://blog-api-japhe.up.railway.app/user/me` no método `DELETE`


## [Como configurar e executar o projeto localmente](#como-configurar-e-executar-o-projeto)

**Para rodar o projeto localmente siga os passos a seguir:**

1. Configure o arquivo `.env` na raiz do projeto de acordo com suas credenciais.
2. Esteja na raiz do projeto e rode o comando `npm install`.

### Se estiver usando Docker
1. Rode o comando `docker compose -f "docker-compose.yml" up -d --build`.
2. Entre no terminal do container rodando o comando `docker exec -it blog sh`.
3. Esteja dentro do terminal do container para os próximos passos.
4. Rode o comando `npm run db-init` para configurar o banco de dados.
5. Rode o comando `npm start` para iniciar o servidor.

### Se não estiver usando Docker (é necessário ter o MySQL instalado)
1. Rode o comando `npm run db-init` para configurar o banco de dados.
2. Rode o comando `npm start` para iniciar o servidor.

E pronto! A API está agora pronta para ser usada localmente no endereço http://localhost:3001


## [Testes](#testes)

Nesse projeto está incluso uma suíte de testes para garantir que tudo funcione como esperado. Você pode executar os testes usando o script `npm test` disponível `package.json`.

## Conclusão

A API para blogs está pronta para ser usada, sinta-se à vontade para contribuir com seu código ou feedback!

Caso queira contribuir com o projeto, lembre-se de seguir as diretrizes de contribuição. E se tiver alguma dúvida ou problema, sinta-se à vontade para abrir uma issue. Ajudarei com muito prazer! 

Obrigado por ler até aqui!

---

> "Coding is not just code, it's about creating solutions."