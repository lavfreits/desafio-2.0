# 

## Descrição do Projeto

Este projeto é uma aplicação de exemplo desenvolvida como parte do aprendizado em Node.js, Express.js, Knex.js e autenticação JWT. Ele consiste em uma API para gerenciar categorias, cursos e usuários, além de permitir a autenticação de usuários utilizando tokens JWT.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento para construção de aplicações server-side utilizando JavaScript.
- **Express.js**: Framework web para Node.js que simplifica o processo de criação de APIs.
- **Knex.js**: Construtor de consultas SQL para Node.js, utilizado como um ORM (Object-Relational Mapping) para interagir com bancos de dados SQL de forma simplificada.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar dados da aplicação.
- **bcryptjs**: Biblioteca para hash de senhas em JavaScript, utilizada para criptografar senhas de usuários.
- **JWT (JSON Web Tokens)**: Padrão de token de autenticação baseado em JSON, utilizado para autenticação de usuários na API.

## Aprendizados

Durante o desenvolvimento deste projeto, aprendi os seguintes conceitos e tecnologias:

- Utilização do Knex.js para interagir com bancos de dados SQL de forma programática.
- Criação de APIs RESTful utilizando o Express.js para gerenciar rotas e controladores.
- Utilização de autenticação JWT para proteger rotas e controlar o acesso de usuários à API.
- Criação de middlewares para manipulação de requisições HTTP, como autenticação de usuários e validação de permissões.
- Implementação de operações CRUD (Create, Read, Update, Delete) em uma API utilizando o Knex.js para interagir com o PostgreSQL.
- Criptografia de senhas de usuários utilizando a biblioteca bcryptjs.

## Executando o Projeto

Para executar o projeto localmente, siga os passos abaixo:

1. Clone o repositório para sua máquina local.
2. Certifique-se de ter o Node.js e o PostgreSQL instalados em seu sistema.
3. Configure as variáveis de ambiente necessárias, como a string de conexão com o banco de dados PostgreSQL.
4. Instale as dependências do projeto executando o comando `npm install`.
5. Execute as migrações do banco de dados utilizando o Knex.js, executando o comando `npx knex migrate:latest`.
6. Inicie o servidor executando o comando `npm start`.
7. A aplicação estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

- **src/routes/**: Diretório contendo os arquivos de definição de rotas da API, organizados por entidades (categorias, cursos, usuários, autenticação).
- **src/controllers/**: Diretório contendo os controladores da aplicação, responsáveis por implementar a lógica de negócio das rotas.
- **src/config/**: Diretório contendo arquivos de configuração, como configuração do banco de dados PostgreSQL e autenticação JWT.
- **src/middlewares/**: Diretório contendo middlewares para manipulação de requisições HTTP, como autenticação de usuários e validação de permissões.
- **src/utils/**: Diretório contendo utilitários e funções auxiliares, como funções de validação de dados.

## Rotas da API

### Autenticação

- **POST /signin**: Rota para autenticar um usuário e gerar um token JWT.
- **POST /signup**: Rota para cadastrar um novo usuário na aplicação.

### Categorias

- **POST /categories**: Rota para cadastrar uma nova categoria.
- **GET /categories**: Rota para obter todas as categorias cadastradas.
- **GET /categories/:name**: Rota para obter uma categoria específica pelo nome.
- **PUT /categories/:name**: Rota para atualizar uma categoria existente pelo nome.
- **DELETE /categories/:name**: Rota para excluir uma categoria existente pelo nome.

### Cursos

- **POST /courses**: Rota para cadastrar um novo curso.
- **GET /courses**: Rota para obter todos os cursos cadastrados.
- **GET /courses/:title**: Rota para obter um curso específico pelo título.
- **PUT /courses/:title**: Rota para atualizar um curso existente pelo título.
- **DELETE /courses/:title**: Rota para excluir um curso existente pelo título.
- **GET /courses/category/:category_id**: Rota para obter todos os cursos de uma categoria específica.

### Usuários

- **POST /users**: Rota para cadastrar um novo usuário na aplicação.
- **GET /users**: Rota para obter todos os usuários cadastrados na aplicação.
- **GET /users/:id**: Rota para obter um usuário específico pelo ID.
- **PUT /users/:id**: Rota para atualizar os dados de um usuário existente pelo ID.
- **DELETE /users/:id**: Rota para excluir um usuário existente pelo ID.

## Considerações Finais

Este projeto serviu como uma excelente oportunidade de aprendizado em Node.js, Express.js, Knex.js, autenticação JWT e boas práticas de desenvolvimento de APIs.
