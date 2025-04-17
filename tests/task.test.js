const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');
const Task = require('../src/models/Task');

describe('Task API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new task', async () => {
    const res = await request(app).post('/api/tasks').send({
      title: 'Test Task',
      description: 'Test description'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test Task');
  });

  it('should retrieve tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
