import supertest from 'supertest';
import app from '../src/server';

test('should convert account numbers to tokens', async () => {
  // arrange
  const accountNumbers = [
    '4111-1111-1111-1111',
    '4444-3333-2222-1111',
    '4444-1111-2222-3333'
  ];

  const s = supertest(app);

  // act
  const { status, body: tokens } = await s
    .post('/tokenize')
    .send(accountNumbers);

  // assert
  expect(status).toBe(200);
  expect(tokens).toStrictEqual(accountNumbers);
});
