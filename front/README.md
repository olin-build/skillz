# Skillz Front End

## Install

Install yarn. Run `yarn install`.

## Develop

Run the back-end server.

Run `yarn start` to start the server.

Visit <http://localhost:1234>.

## Test

`yarn test`

`./node_modules/jest --watch` to test in watch mode (recommended).

If you make a UI change that intentionally invalidates the snapshots, review
the changes in the test runner or `git diff`, and then run `jest -u` to
update them.

## Deploy

(First time:) `netlify deploy`. Answer `dist` for the distribution directory.

Subsequently: `yarn deploy`
