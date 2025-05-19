# Investe Aí - back-end

Back-end project for an investment platform.

Access the link at:
https://invest-ai-back.onrender.com

## 🛠️ Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- Joi (validação)
- Jest + Supertest (testes automatizados)

---

## ⚙️ Como rodar o projeto localmente

### Pré-requisitos:
- Node.js v18+ instalado
- PostgreSQL rodando
- npm
- Git

---

### Instalação

#### 1. Clone o repositório:

git clone https://github.com/seu-usuario/investe-ai.git
cd backend

---

#### 2. Instale as dependências:

npm install

---

### Configuração

#### 3. Crie um arquivo .env na raiz com o seguinte conteúdo (ajuste com suas credenciais):

DATABASE_URL="postgresql://usuario:senha@localhost:5432/investeai"

---

#### 4. Certifique-se de que o banco investeai foi criado no PostgreSQL, caso contrário o faça manualmente.

---

### Migrações

#### 5. Execute as migrações do Prisma para criar as tabelas no banco de dados:
 
npx prisma migrate dev --name init

---

### Iniciando o servidor: 

#### 6. Para iniciar o servidor em modo de desenvolvimento, execute o seguinte comando:

npm run dev

- A API estará disponível em: http://localhost:3000

---

### Testes

#### 7. Execute os Testes automatizados:

npm run test

---

### Endpoints principais

| Método | Rota        | Descrição                                 |
| ------ | ----------- | ----------------------------------------- |
| POST   | `/`         | Cria ou atualiza um usuário e seus ativos |
| GET    | `/:frontId` | Retorna os dados de um usuário específico |

---

### Estrutura resumida

```bash
.
├── src
│   ├── config
│   │   ├── database.ts
│   ├── controllers
│   │   ├── userController.ts
│   ├── middlewares
│   │   ├── errorHandler.ts
│   │   ├── validateSchema.ts
│   ├── models
│   │   ├── userModel.ts
│   ├── routes
│   │   ├── userRoutes.ts
│   ├── services
│   │   ├── userService.ts
│   ├── tests
│       ├── user.test.ts
├── .env.example
├── .gitignore
├── package.json
├── prisma.schema
└── tsconfig.json

```
