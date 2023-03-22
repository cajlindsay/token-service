import supertest from 'supertest';
import app from '../src/server';

test('should convert tokens to account numbers', async () => {
  // arrange
  const tokens = [
    'fvMymE7X0Je1IzMDgWooV5iGBPw0yoFy',
    'L4hKuBJHxe67ENSKLVbdIH8NhFefPui2',
    'ZA5isc0kVUfvlxTE5m2dxIY8AG76KoP3'
  ];

  const s = supertest(app);

  // act
  const { status, body: accountNumbers } = await s
    .post('/tokenize')
    .send(tokens);

  // assert
  expect(status).toBe(200);
  expect(accountNumbers).toStrictEqual(tokens);
});
