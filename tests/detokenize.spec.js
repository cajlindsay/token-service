import supertest from 'supertest';
import app from '../src/server';
import { tokensCollection } from '../src/db';

test('should convert tokens to account numbers', async () => {
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

  const expectedAccountNumbers = tokenRecords.map(
    ({ accountNumber }) => accountNumber
  );
  const tokens = tokenRecords.map(({ token }) => token);

  tokensCollection.insert(tokenRecords);

  // act
  const { status, body } = await supertest(app)
    .post('/detokenize')
    .send(tokens);

  // assert
  expect(status).toBe(200);
  expect(body).toStrictEqual(expectedAccountNumbers);
});
