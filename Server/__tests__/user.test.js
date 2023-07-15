const request = require("supertest");
const app = require("../src/app");
const e = require("express");
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;

let mongoUri;

beforeAll(async () => {
  await mongoServer.start();
  mongoUri = await mongoServer.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(mongoUri, mongooseOpts);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});


describe('GET /', () => {
  let token;

  beforeAll(async () => {
    const payload = { id: 'test-id', email: 'test@test.com' };
    token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
  });

  test('Test with correct token', async () => {
    const res = await request(app)
      .get('/')
      .set('x-access-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 'test-id');
  });

  test('Test with bad token', async () => {
    const res = await request(app)
      .get('/')
      .set('x-access-token', 'badToken');
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Invalid token');
  });

  test('Test with no token', async () => {
    const res = await request(app)
      .get('/')
      .set('x-access-token', '');
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'No token provided');
  });

});

describe('POST /register', () => {

  test('Test with normal action', async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'test', password: 'password', email: 'test@test.com' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Test to register same user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'test', password: 'password', email: 'test@test.com' });
    expect(res.statusCode).toEqual(400);
  });

});

describe('POST /login', () => {
  test('Test with normal action', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: 'password' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('id');
  });

  test('Test with wrong password', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: 'paword' });
    expect(res.statusCode).toEqual(400);
  });

  test('Test with bad email', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'ere@test.com', password: 'password' });
    expect(res.statusCode).toEqual(401);
  });

});

describe('DELETE /users/:id', () => {

  let token;

  let userIdToDelete;

  beforeAll(async () => {
    const payload = { id: 'test-id', email: 'test@test.com' };
    token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

    await request(app)
      .post('/register')
      .send({ username: 'userToDelete', password: 'password', email: 'userToDelete@test.com' });

      const res = await request(app)
      .post('/login')
      .send({ email: 'userToDelete@test.com', password: 'password' });

      userIdToDelete = res.body.id;
  });

  test('Test with normal action', async () => {
    const res = await request(app)
      .delete('/users/' + userIdToDelete)
      .set('x-access-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });

  test('Test with bad userId', async () => {
    const res = await request(app)
      .delete('/users/badUserId')
      .set('x-access-token', token);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });

});

let tokenToChangePassword;

describe('POST /users/forgot-password', () => {

  test('Test with normal action', async () => {
    const res = await request(app)
      .post('/users/forgot-password')
      .send({ email: 'test@test.com' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    tokenToChangePassword = res.body.token;
  });

  test('Test with bad email', async () => {
    const res = await request(app)
      .post('/users/forgot-password')
      .send({ email: 'est@test.com' });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });

});

describe('POST /users/reset-password/:token', () => {

  test('Test with normal action', async () => {
    const res = await request(app)
      .post(`/users/reset-password/${tokenToChangePassword}`)
      .send({ password: 'newPassword' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Password has been updated.');
  });

  test('Test with bad token', async () => {
    const res = await request(app)
      .post(`/users/reset-password/badToken`)
      .send({ password: 'newPassword' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Password reset token is invalid or has expired.');
  });

});

describe('GET /me', () => {

  let token;

  beforeAll(async () => {

    const res = await request(app)
      .post('/register')
      .send({ username: 'user', password: 'password', email: 'user@test.com' });

      token = res.body.token;
  });

  test('Test with normal action', async () => {
    const res = await request(app)
      .get('/me')
      .set('x-access-token', token);
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('id', 'test-id');
  });
});

describe('PUT /users/:id', () => {

  let token;
  let userId;

  beforeAll(async () => {

    const res = await request(app)
      .post('/register')
      .send({ username: 'user', password: 'password', email: 'user@test.com' });

      const res2 = await request(app)
      .post('/login')
      .send({ email: 'user@test.com', password: 'password' });

      userId = res2.body.id;

      token = res2.body.token;
  });

  test('Test with normal action', async () => {
    const res = await request(app)
      .put('/users/' + userId)
      .set('x-access-token', token)
      .send({ age: 30, city: 'Paris', description: 'Test user' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User updated successfully');
    expect(res.body.user).toHaveProperty('age', 30);
  });

  test('Test with bad userId', async () => {
    const res = await request(app)
      .put('/users/badUserId')
      .set('x-access-token', token)
      .send({ age: 30, city: 'Paris', description: 'Test user' });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });

});
