import express from 'express';
import randomToken from 'rand-token';
import { tokensCollection } from './db.js';

const { PORT = 3000, NODE_ENV } = process.env;

// create the express app
const app = express();

// ensure that the req.body can be parsed to json
app.use(express.json());

// endpoints
app.post('/tokenize', (req, res) => {
  // convert account numbers to token records
  const accountNumbers = req.body;

  const records = accountNumbers.map((accountNumber) => ({
    accountNumber,
    token: randomToken.generate(32)
  }));

  // insert records into tokens collection
  tokensCollection.insert(records);

  // return plain tokens from token records
  const tokens = records.map(({ token }) => token);
  res.json(tokens);
});

app.post('/detokenize', (req, res) => {
  // get matching token records from tokens collection
  const tokens = req.body;
  const records = tokensCollection.find({ token: { $in: tokens } });

  // return account numbers from token records
  const accountNumbers = records.map(({ accountNumber }) => accountNumber);
  res.json(accountNumbers);
});

// only host when not in test environment
if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`tokenization service listening on port ${PORT}`);
  });
}

// export app so that it can be tested
export default app;
