[![Release](https://github.com/renatops1991/saturn-service/actions/workflows/release.yml/badge.svg?branch=production&event=release)](https://github.com/renatops1991/saturn-service/actions/workflows/release.yml)
[![Coverage Status](https://coveralls.io/repos/github/renatops1991/saturn-service/badge.svg?branch=production)](https://coveralls.io/github/renatops1991/saturn-service?branch=production)
![typescript](https://img.shields.io/badge/Typescript-4.9.3-blue)
![nodejs](https://img.shields.io/badge/node-v16.17.1-green)
![npm](https://img.shields.io/badge/npm-v8.15.0-blue)


# Saturn Service (User API)

Saturn Service is a API used for user creation and authentication. Where you can create, update and fetch user data. It is part of a project aimed at creating portfolios for financial control wallet.

## Stacks 
- Design Patterns
  - Factory Method
  - Adapter
  - Composite
  - Builder
- Express
- Bcrypt
- JWT
- MongoDB
- Nodemon
- Jest
- Eslint

## Installation

```bash
cp example.env .env
npm install
```

## Running the Application with node
```bash
npm run start
npm run start:dev
```

## Running the Application with debug
```bash
npm run start:debug
```

## Running the Application with docker
```bash
docker compose up
```

## API Routes
All routes run on port 3001 but you can change it in .env file

- Sign Up: `{{host}}/api/sign-up`
- Sign In: `{{host}}/api/sign-in`
- Get User: `{{host}}/api/user` ![auth](https://img.shields.io/badge/auth-yes-green)
- Get All Users: `{{host}}/api/users` ![auth](https://img.shields.io/badge/auth-yes-green) 
- Update User: `{{host}}/api/user` ![auth](https://img.shields.io/badge/auth-yes-green)
- Confirm User: `{{host}}/api/user/confirm` ![auth](https://img.shields.io/badge/auth-yes-green)
- Redefine password: `{{host}}/api/user/redefine-password` ![auth](https://img.shields.io/badge/auth-yes-green)
 
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
