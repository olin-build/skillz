# Skillz Back End

## Install

Install yarn. Run `yarn install`.

Install PostgreSQL. On macOS: install Homebrew, then `brew install postgresql`.

```bash
createuser skillz
createdb skillz
psql skillz < config/schema.sql
DATABASE_URL=postgres://skillz@localhost/skillz yarn db:migrate
```

For development, run `psql skillz < data/dev_data.sql` to seed the `person` table.


Run `yarn start` to start the API server.
Visit <http://localhost:3000/graphiql> to browse the data.

## Acknowledgements

Built with <https://github.com/postgraphql/postgraphql>
