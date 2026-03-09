# NestJS Order API

Este repositório contém uma API escrita em **NestJS** para gerenciar pedidos e itens.
Os dados são armazenados em um banco SQL através de **Knex**; a configuração suporta Postgres, SQLite, etc.

## Estrutura relevante

```
src/
  app.module.ts           # importações gerais
  main.ts                 # bootstrap e configurações globais
  orders/
    orders.module.ts
    orders.controller.ts
    orders.service.ts     # lógica de negócios e mapeamento
    dto/                  # DTOs com validação
  config/
    db.ts                 # provedor Knex
src/migrations/          # tabelas orders & items
src/seeds/               # dados iniciais

knexfile.js              # configuração do Knex (usa .env)
.env.example             # variáveis de ambiente
package.json             # scripts e dependências
```

## Dependências adicionais

- `@nestjs/config` para leitura de `.env`
- `knex`, `pg`, `dotenv` para banco de dados
- `class-validator`/`class-transformer` para validação de DTOs
- `cors` habilitado via `enableCors` no `main.ts`
- `@nestjs/swagger` e `swagger-ui-express` para documentação

## Configuração e execução

1. `cp .env.example .env` e preencha com os valores apropriados (DB, PORT, CORS_WHITELIST).
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute as migrations:
   ```bash
   npm run migrate
   ```
4. (Opcional) Rode os seeds:
   ```bash
   npm run seed
   ```
5. Inicie o servidor Nest (via ts-node ou build + node):
   ```bash
   npm run start:dev
   # ou
   npm run build && npm run start:prod
   ```

A API estará disponível em `http://localhost:3000` ou na porta definida em `.env`.

## Documentação Swagger

Faça requisições à rota:

```
GET http://localhost:3000/api-docs
```

para ver a API interativa.

## Endpoints

| Método | Caminho             | Descrição                              |
|--------|---------------------|----------------------------------------|
| POST   | `/order`            | Cria um novo pedido                    |
| GET    | `/order/:id`        | Busca pedido por `numeroPedido`        |
| GET    | `/order/list`       | Lista todos os pedidos                 |
| PATCH  | `/order/:id`        | Atualiza pedido                        |
| DELETE | `/order/:id`        | Remove pedido                          |

Os endpoints utilizam DTOs com validação, assim campos faltantes ou de
formato incorreto retornam `400 Bad Request`.

### Exemplo de criação

```bash
curl -X POST http://localhost:3000/order \
  -H 'Content-Type: application/json' \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [
      {"idItem":"2434","quantidadeItem":1,"valorItem":1000}
    ]
  }'
```

O serviço mapeia automaticamente os campos para as tabelas `orders` e
`items` antes de gravar.

## Observações finais

- As tabelas e seeds podem ser geradas com `npm run migrate`/`npm run seed`.
- A whitelist de CORS é carregada da variável `CORS_WHITELIST`.
- Você pode estender o módulo `orders` com autenticação JWT ou documentação
  Swagger conforme necessário.
