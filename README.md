<p align="center">
<a href="http://nestjs.com/" target="blank"><img src="./.readme/ironhand.svg" width="150" alt="Iron Hand Logo" /></a>
</p>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="60" alt="Nest Logo" /></a>
  <a href="https://graphql.org" target="blank"><img src="./.readme/mongodb.svg" width="60" alt="GraphQL Logo" /></a>
  <a href="https://graphql.org" target="blank"><img src="./.readme/graphql.svg" width="60" alt="GraphQL Logo" /></a>
</p>
  <p align="center">Iron Hand's backend <a href="https://adri.info" target="_blank"><i>by Adri</i></a></p>
    <p align="center">
</p>

## Description

[Adri](https://adri.info)'s backend, with NestJS, MongoDB and GraphQL to serve [Iron Hand v3 frontend](https://github.com/AdrianoLG/ironhand3-client).

For complete development setup, go to [Wiki](https://github.com/AdrianoLG/ironhand3-server/wiki/Development-environment)

## Project setup

1. Install <i>npm</i> packages

```bash
$ npm install
```

2. Rename the `.db-env` file to ".env" and change the variables to your database values

```bash
DATABASE_URL=#your database url - mongodb://[user]:[password]@[host]:[port]#
DATABASE_NAME=#your database name#
ALLOWED_HOSTS=#allowed hosts in backend#
UPLOADS_URI=#uploads public folder#
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Website - [https://adri.info](https://adri.info/)
