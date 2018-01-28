# Skillz

An experimental people skill finder.

## Develop

This project consists of a front-end and back-end subproject, that are versioned
together but deployed separately. See their individual README's for specific
development instructions.

Run front-end and back-end tests: `yarn test`. This works, but doesn't
terminate! (Help?)

Run tests in watch mode: `jest --watch`. You'll need `jest` on your path:
run `yarn install` and add `./node_modules` to your path, or install `jest`
globally.

## Deploy

Deployment assumes `./front` folder is configured to deploy `dist` to Netlify,
and the overall project is associated with a Heroku app.

`yarn deploy`

## LICENSE

MIT
