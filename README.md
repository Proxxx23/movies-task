# Description
This is a small API made for a technical recruitment process. It allows adding and searching for the movies in DB with JSON format.

## Prerequisites
Copy `.env.example` file into `.env` file.

## Run app
- `npm install` if you run it for the first time, and then...
- `npm run dev` (will run in a nodemon mode)

Application will run on [https://localhost:3000](localhost:3000)

## Tests
Tests use `testServer.ts`. NODE_ENV env variable is set to a value different than `"production"` there. It means tests will operate on a test database (`db-test.json`).

After all suites have ran database is replicated from `db-orig.json` into `db-test.json` to ensure tests always run on clean original database.

To run tests: `npm run test`

### Endpoints

| Endpoints                                                           |
|---------------------------------------------------------------------|
| [GET] /search?duration={number}&category={string}&category={string} |
| [POST] /add                                                         |

