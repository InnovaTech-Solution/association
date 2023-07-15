const request = require("supertest");
const app = require("../src/app");
const e = require("express");
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;

let mongoUri;

beforeAll(async () => {
    await mongoServer.start();
    mongoUri = await mongoServer.getUri();
    const mongooseOpts = {
        useNewUrlParser: true, useUnifiedTopology: true,
    };
    await mongoose.connect(mongoUri, mongooseOpts);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// Test the POST /opinion/add route
describe('POST /review/add', () => {
    let token;

    beforeAll(async () => {

        await request(app)
            .post('/register')
            .send({username: 'userToDelete', password: 'password', email: 'userToDelete@test.com'});

        const res = await request(app)
            .post('/login')
            .send({email: 'userToDelete@test.com', password: 'password'});
        token = res.body.token;
    });

    test('Create review with valid data', async () => {
        const res = await request(app)
            .post('/review/add')
            .set('x-access-token', token)
            .send({
                grade: '2',
                comment: 'Test Comment',
                senderUserId: "senderUUID",
                affectedUserId: "affectedUUID",
                adId: "adUUID"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Review added successfully');
    });

    test('Try to create review without required field', async () => {
        const res = await request(app)
            .post('/review/add')
            .set('x-access-token', token)
            .send({});
        expect(res.statusCode).toEqual(400);
    });

    test('Try to create review without authentication', async () => {
        const res = await request(app)
            .post('/review/add')
            .set('x-access-token', "invalidToken")
            .send({
                grade: '2',
                comment: 'Test Comment',
                senderUserId: "senderUUID",
                affectedUserId: "affectedUUID",
                adId: "adUUID"
            });
        expect(res.statusCode).toEqual(401);
    });
})
;

// Test the GET /review/:id route

describe('GET /review/:id', () => {
    let token;
    let reviewId;

    beforeAll(async () => {
        await request(app)
            .post('/register')
            .send({username: 'userToDelete', password: 'password', email: 'userToDelete@test.com'});

        const res = await request(app)
            .post('/login')
            .send({email: 'userToDelete@test.com', password: 'password'});
        token = res.body.token;
        const res2 = await request(app)
            .post('/review/add')
            .set('x-access-token', token)
            .send({
                grade: '2',
                comment: 'Test Comment',
                senderUserId: "senderUUID",
                affectedUserId: "affectedUUID",
                adId: "adUUID"
            });
        reviewId = res2.body.data.id;
    });

    test('Get review with valid id', async () => {
        const res = await request(app)
            .get('/review/' + reviewId)
            .set('x-access-token', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', reviewId);
    });

    test('Get review with invalid id', async () => {
        const res = await request(app)
            .get('/review/invalidId')
            .set('x-access-token', token);
        expect(res.statusCode).toEqual(400);
    });

    test('Get review without authentication', async () => {
        const res = await request(app)
            .get('/review/' + reviewId)
            .set('x-access-token', "invalidToken");
        expect(res.statusCode).toEqual(401);
    });
})
;
