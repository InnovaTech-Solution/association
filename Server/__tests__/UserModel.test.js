const request = require("supertest");
const app = require("../src/app");
const e = require("express");
const jwt = require('jsonwebtoken');

const User = require('../src/models/users.model');

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

describe('User Model Test', () => {
    it('Create & save user successfully', async () => {
      const userData = {
        id: 'test-id',
        username: 'testusername',
        email: 'test@test.com',
        password: 'testpass',
        age: 22,
        city: 'testcity',
        description: 'test description',
      };
      const validUser = new User(userData);
      const savedUser = await validUser.save();
  
      expect(savedUser.id).toBe(userData.id);
      expect(savedUser.username).toBe(userData.username);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.password).toBe(userData.password);
      expect(savedUser.age).toBe(userData.age);
      expect(savedUser.city).toBe(userData.city);
      expect(savedUser.description).toBe(userData.description);
    });
  
    it('Get all users', async () => {
      const users = await User.getUsers();
      expect(users.length).toBe(1);
    });
  });