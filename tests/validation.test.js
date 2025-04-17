const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');

describe('Validation Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should fail creating task without title', async () => {
    const res = await request(app).post('/api/tasks').send({
      description: 'Missing title'
    });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('should fail creating project without name', async () => {
    const res = await request(app).post('/api/projects').send({
      description: 'Missing name'
    });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
