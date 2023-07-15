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

// Test the /ads route

describe('POST /ads', () => {
    let token;

    beforeAll(async () => {
    
        await request(app)
          .post('/register')
          .send({ username: 'userToDelete', password: 'password', email: 'userToDelete@test.com' });
    
          const res = await request(app)
          .post('/login')
          .send({ email: 'userToDelete@test.com', password: 'password' });
          token = res.body.token;
      });

    test('Create ad with valid data', async () => {
      const res = await request(app)
        .post('/ads')
        .set('x-access-token', token)
        .send({
          name: 'Test Ad',
          description: 'Test Description',
          price: 100,
          isOffer: true,
          isBoosted: false
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', 'Test Ad');
    });
  
    test('Try to create ad without required field', async () => {
      const res = await request(app)
        .post('/ads')
        .set('x-access-token', token)
        .send({
          description: 'Test Description',
          price: 100,
          isOffer: true,
          isBoosted: false
        });
      expect(res.statusCode).toEqual(400);
    });
  
    test('Try to create ad without authentication', async () => {
      const res = await request(app)
        .post('/ads')
        .send({
          name: 'Test Ad',
          description: 'Test Description',
          price: 100,
          isOffer: true,
          isBoosted: false
        });
      expect(res.statusCode).toEqual(401);
    });
  });

  // Test the PUT /ads/:id route

  describe('PUT /ads/:id', () => {
    let token;
    let adId;

    let someElseToken;
  
    beforeAll(async () => {

      const payload = { id: 'test-id', email: 'test@test.com' };
      someElseToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

      await request(app)
        .post('/register')
        .send({ username: 'userToUpdate', password: 'password', email: 'userToUpdate@test.com' });
  
      const loginResponse = await request(app)
        .post('/login')
        .send({ email: 'userToUpdate@test.com', password: 'password' });
      token = loginResponse.body.token;
  
      const adResponse = await request(app)
        .post('/ads')
        .set('x-access-token', token)
        .send({
          name: 'Test Ad',
          description: 'Test Description',
          price: 100,
          isOffer: true,
          isBoosted: false
        });
      adId = adResponse.body._id;
    });
  
    test('Update ad with valid data', async () => {
      const res = await request(app)
        .put(`/ads/${adId}`)
        .set('x-access-token', token)
        .send({ name: 'Updated Ad' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', 'Updated Ad');
    });
  
    test('Try to update ad without required field', async () => {
      const res = await request(app)
        .put(`/ads/${adId}`)
        .set('x-access-token', token)
        .send({});
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', 'Updated Ad');
    });
  
    test('Try to update ad without authentication', async () => {
      const res = await request(app)
        .put(`/ads/${adId}`)
        .send({ name: 'Updated Ad' });
      expect(res.statusCode).toEqual(401);
    });
  
    test('Try to update ad that does not exist', async () => {
      const res = await request(app)
        .put(`/ads/60f7ea4a0b5f5c6d476d8bfb`)
        .set('x-access-token', token)
        .send({ name: 'Updated Ad' });
      expect(res.statusCode).toEqual(404);
    });
  
    test('Try to update ad with someone else’s token', async () => {
      const res = await request(app)
        .put(`/ads/${adId}`)
        .set('x-access-token', someElseToken)
        .send({ name: 'Updated Ad' });
      expect(res.statusCode).toEqual(403);
    });
  });

  // Test the DELETE /ads/:id route
  
  describe('DELETE /ads/:id', () => {
    let token;
    let adId;
    let someElseToken;
  
    beforeAll(async () => {
      const payload = { id: 'test-id', email: 'test@test.com' };
      someElseToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
  
      await request(app)
        .post('/register')
        .send({ username: 'userToDelete', password: 'password', email: 'userToDelete@test.com' });
  
      const loginResponse = await request(app)
        .post('/login')
        .send({ email: 'userToDelete@test.com', password: 'password' });
      token = loginResponse.body.token;
  
      const adResponse = await request(app)
        .post('/ads')
        .set('x-access-token', token)
        .send({
          name: 'Test Ad',
          description: 'Test Description',
          price: 100,
          isOffer: true,
          isBoosted: false
        });
      adId = adResponse.body._id;
    });
  
    test('Try to delete ad with someone else’s token', async () => {
      const res = await request(app)
        .delete(`/ads/${adId}`)
        .set('x-access-token', someElseToken);
      expect(res.statusCode).toEqual(403);
    });

    test('Delete ad with valid id', async () => {
      const res = await request(app)
        .delete(`/ads/${adId}`)
        .set('x-access-token', token);
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Ad deleted');
    });
  
    test('Try to delete ad without authentication', async () => {
      const res = await request(app)
        .delete(`/ads/${adId}`);
      expect(res.statusCode).toEqual(401);
    });
  
    test('Try to delete ad that does not exist', async () => {
      const res = await request(app)
        .delete(`/ads/60f7ea4a0b5f5c6d476d8bfb`)
        .set('x-access-token', token);
      expect(res.statusCode).toEqual(404);
    });
  
  });
  