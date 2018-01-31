# Skillz Back End

## Install

Install yarn. Run `yarn install`.

Install PostgreSQL. On macOS: install Homebrew, then `brew install postgresql`.

Set the environment variable `DATABASE_URL=postgres://skillz@localhost/skillz`.

Create the database, and add dummy data for development:

```bash
yarn db:init
yarn db:fixtures
```

## Configuration

`PORT=500` — HTTP port

`DATABASE_URL=postgres://skillz@localhost/skillz`

`IP_WHITELIST=127.0.0.1` — a comma-separated list of IPs or CDIRs that are
allowed access to the server APIs.

## Develop

Run `yarn develop` to run the API server in watch mode.

Visit <http://localhost:3000/graphiql> to browse the data.

## Test

`yarn test`

`jest --watch` to test in watch mode (recommended).

## Working with Migrations

This project uses [node-pg-migrate](https://yarnpkg.com/en/package/node-pg-migrate) for database migrations.

You will need `./node_modules/.bin` in your `PATH` in order to access `node-pg-migrate` as shown here.

Create a migration:

```bash
node-pg-migrate create $migration_name  # create the migration
# edit the resulting file
node-pg-migrate up  # apply the migration
node-pg-migrate red  # apply the down migration, and then the up one again
```

## Colophon

<https://github.com/postgraphql/postgraphql>
