## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## ORM

```bash
pnpm install -D prisma
npx prisma init

# generate sql
npx prisma migrate dev --name "init"

# add seed.ts then, init db data
npx prisma db seed
```

## Swagger
``` bash
pnpm install --save @nestjs/swagger swagger-ui-express

```

## Input Validation
```bash
pnpm install class-validator class-transformer
```

## Filter
```bash
npx nest generate filter prisma-client-exception
```

## Helmet
```bash
https://docs.nestjs.com/security/helmet
```

## CORS
```bash
https://docs.nestjs.com/security/cors
```

## Authorization
```bash
https://docs.nestjs.com/security/authorization
```