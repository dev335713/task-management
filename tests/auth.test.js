const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');
const User = require('../src/models/User');

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const userData = {
    name: "Test User",
    email: "testuser@example.com",
    password: "password123"
  };

  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send(userData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.user.email).toBe(userData.email);
  });

  it('should not register with existing email', async () => {
    const res = await request(app).post('/api/auth/register').send(userData);
    expect(res.statusCode).toEqual(400);
  });

  it('should login with valid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: userData.password
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });

  it('should not login with invalid password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: "wrongpassword"
    });
    expect(res.statusCode).toEqual(401);
  });

  it('should not login with non-existing email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: "noexist@example.com",
      password: "password123"
    });
    expect(res.statusCode).toEqual(401);
  });
});
