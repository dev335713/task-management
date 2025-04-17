const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');
const Project = require('../src/models/Project');

describe('Project API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new project', async () => {
    const res = await request(app).post('/api/projects').send({
      name: 'Test Project',
      description: 'Project description'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('Test Project');
  });

  it('should retrieve projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
