import path from 'path';
import { Client } from 'pg';
import { IpFilter } from 'express-ipfilter';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import postgraphql from 'postgraphql';
import { constructQuery } from './orm';

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://skillz@localhost/skillz';
const IP_WHITELIST = (process.env.IP_WHITELIST || '127.0.0.1').split(',');

export const client = new Client({ connectionString: DATABASE_URL });
export const app = express();

export const getRealAddress = (req) => {
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
  if (ip) {
    const m = ip.split(/,\s*/);
    if (m) {
      return m.pop();
    }
  }
  return req.connection.remoteAddress;
};


morgan.token('remote-addr', getRealAddress);

app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(IpFilter(IP_WHITELIST, {
  allowedHeaders: ['x-forwarded-for'],
  excluding: ['^/$'],
  logLevel: 'deny',
  mode: 'allow',
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// There doesn't appear to be a way to disconnect the postgraphql/pg connection,
// so postgraphql prevents jest from quitting.
if (process.env.NODE_ENV !== 'test') {
  app.use(postgraphql(DATABASE_URL, { graphiql: true }));
}

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'static', 'index.html')));


app.post('/person/:personId/skill/:skillId/', async (req, res) => {
  const { personId, skillId } = req.params;
  const data = req.body;
  const { update, insert, params } = constructQuery({
    tableName: 'person_skill',
    where: { person_id: personId, skill_id: skillId },
    cols: ['experience', 'interest'],
    data,
  });
  const { rowCount } = await client.query(update, params);
  if (rowCount === 0) {
    await client.query(insert, params);
  }
  res.json(data);
});

const start = async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error(`pg client connect: ${err.error}`);
    process.exit(1);
  }
  console.log(`Connected to ${DATABASE_URL.replace(/:[^\/]+?(?=@)/, '')}`);
  await app.listen(PORT, () => console.log(`API server listening on port ${PORT}.`));
};


if (require.main === module) {
  start();
}
