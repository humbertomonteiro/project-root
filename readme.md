# Backend Node.js com Sequelize

Este é um projeto backend desenvolvido em Node.js utilizando o Sequelize como ORM para integração com o banco de dados MySQL. O objetivo é criar uma aplicação com CRUDs para gerenciar Users, Products, Categories e tabelas relacionadas.

## Tecnologias e Bibliotecas

- **Node.js:** Plataforma utilizada para desenvolvimento do backend.

- **Express:** Framework para criação do servidor.

- **Sequelize:** ORM utilizado para modelagem e manipulação do banco de dados MySQL.

- **MySQL:** Banco de dados utilizado na aplicação.

- **jsonwebtoken (JWT):** Gerenciamento de tokens para autenticação e autorização.

- **bcrypt:** Biblioteca para criptografar senhas.

- **dotenv:** Gerenciamento de variáveis de ambiente.

## Estrutura de Diretórios

```bash
src/
├── config/             # Integração com o sequelize
├── controllers/        # Lógica das rotas
├── database/           # Sincronização de tabelas
├── models/             # Definição dos modelos Sequelize
├── routes/             # Definição de rotas
├── middleware/         # Middlewares, incluindo autenticação JWT
└── server.js           # Arquivo principal para
```

## Configuração e Inicialização

1. Clone o repositório:

```bash

Copy code
git clone <url-do-repositorio>
cd <nome-do-repositorio>

```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo .env: Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```bash
APP_KEY=<chave-secreta-para-jwt>
```

4. Sincronize as tabelas do banco de dados: Use o arquivo syncforce.js para criar as tabelas no banco:

```bash
node src/database/syncforce.js
```

5. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

## Endpoints Principais

### Rotas Públicas

- POST /users: Criação de usuários.
- POST /login: Autenticação do usuário e retorno de token JWT.

### Rotas Protegidas (Autenticação JWT)

- PUT, DELETE, POST: Operações que exigem autorização, como gerenciar produtos e categorias.
- Exceções: Algumas rotas, como a criação de usuários, são públicas.

### CRUDs Disponíveis

1. Users: Gerenciamento de usuários.
2. Products: Produtos e tabelas relacionadas:

- Options Products e Images Products: Tabelas auxiliares relacionadas a Products.

3. Categories: Gerenciamento de categorias.
4. Products Categories: Tabela de relação "muitos para muitos" entre Products e Categories (menos utilizada, mas criada na sincronização).

## Autenticação e Segurança

1. JWT:

Necessário para acessar rotas protegidas.
O token é gerado após o login na rota /login e deve ser enviado no header Authorization como token = token do login

1. Bcrypt:

As senhas dos usuários são criptografadas antes de serem armazenadas no banco.
Scripts Disponíveis
npm run dev: Inicia o servidor em modo de desenvolvimento.
node src/database/syncforce.js: Sincroniza as tabelas com o banco de dados.
