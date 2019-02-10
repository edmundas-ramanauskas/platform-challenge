This project was bootstrapped with [express-generator](https://github.com/expressjs/generator).

## Available Scripts

In the project directory, you can run:

### `npm run eslint`

Runs eslint to check for syntax and style errors

### `docer-compose up`

Builds and starts app containers

## API endpoints

App exposes 2 rest endpoints:

### `POST /storage/persist/:id`

Use this endpoint to persist data. Curl example:

```
curl --request POST \
  --url http://localhost:8080/storage/persist/something \
  --header 'content-type: application/json' \
  --header 'encryption-key: not-very-random-key' \
  --data '{"value": "something very important"}'
```

### `GET /storage/retrieve/:id`

Use this endpoint to retrieve persisted data. Curl example:

```
curl --request GET \
  --url http://localhost:8080/storage/retrieve/something \
  --header 'encryption-key: not-very-random-key'
```

## Stack

- App is writen in JavaScript and uses Express framework
- App uses PostgreSQL as a persistence layer
- App is containerized using Docker

## Posible future improvemnts

- Write tests
- Use TypeScript
- Integrate GraphQL
