# inventory-api-ts

Um CRUD fullstack simples de gerenciamento de produtos feito para praticar integração entre backend e frontend

## Stack

### Backend

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Docker

### Frontend

- React
- TypeScript
- Vite

## O que o projeto faz

- Lista produtos
- Cria produtos
- Edita produtos
- Remove produtos
- Integra frontend (react) com API (express)

## Como rodar

### Requisitos

- Docker Desktop
- Node.js

### Subir PostgreSQL

```bash
docker compose up -d
```

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Variáveis de ambiente

Backend `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/inventory_db"
PORT=8080
```

## Endpoints

```txt
GET /products
POST /products
PUT /products/:id
DELETE /products/:id
```
