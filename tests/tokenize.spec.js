import supertest from 'supertest';
import randomToken from 'rand-token';
import { expect, test, vi } from 'vitest';
import app from '../src/server';
import { tokensCollection } from '../src/db';

afterEach(() => {
  vi.restoreAllMocks();
});

test('should convert account numbers to tokens', async () => {
  // arrange
  const tokenRecords = [
    {
      accountNumber: '4111-1111-1111-1111',
      token: 'NiTkTbDORu5t0jy9UpTqzfgNWI6E4qMi'
    },
    {
      accountNumber: '4444-3333-2222-1111',
      token: 'nXnMyqTVu0vkyvNXucGtWb8M7FEW9xuU'
    },
    {
      accountNumber: '4444-1111-2222-3333',
      token: '1ZrDWEdyiE6lm76MjBy4mbpfBKMofJD5'
    }
  ];

  const accountNumbers = tokenRecords.map(({ accountNumber }) => accountNumber);
  const expectedTokens = tokenRecords.map(({ token }) => token);

  // mock the random token generator so that we
  // know what to expect in the response.
  const tokensQueue = expectedTokens.slice();
  vi.spyOn(randomToken, 'generate').mockImplementation(() =>
    tokensQueue.shift()
  );

  // act
  const { status, body } = await supertest(app)
    .post('/tokenize')
    .send(accountNumbers);

  // assert the response
  expect(status).toBe(200);
  expect(body).toStrictEqual(expectedTokens);

  // assert that records have been inserted into tokens collection
  const records = tokensCollection.find();
  expect(records).toEqual(
    tokenRecords.map((record) => expect.objectContaining(record))
  );
});
