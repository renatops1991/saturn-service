[![Coverage Status](https://coveralls.io/repos/github/renatops1991/saturn-service/badge.svg?branch=production)](https://coveralls.io/github/renatops1991/saturn-service?branch=production)

# Saturn Service

Saturn Service is an API that you plan for your finance organization, with  it you can report all earnings and estimated costs of future investments.

## Stacks 
- Node.js 16.x
- TypeScript 4.8
- Express
- Bcrypt
- JWT
- MongoDB

## Installation

```bash
cp example.env .env
npm install
```

## Running the Application with node
```bash
npm run start
```

## Running the Application with docker
```bash
npm run start:dev
or
docker compose up
```

## API Routes
All routes run on port 3001 but you can change it in .env file

- Create User: `{{host}}/api/create`

## Running tests
```bash
# Running all test
npm run test

# Unit test
npm run test:unit

# Integration test
npm run test:e2e

# Running all test with coverage
npm run test:ci

# Running all test and show errors
npm run test:verbose

```
