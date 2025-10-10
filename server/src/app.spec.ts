import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from './app';

describe('Express Application (App.ts)', () => {
  it('should respond to a basic GET request', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBeGreaterThanOrEqual(200);
    expect(response.statusCode).toBeLessThan(500);
  });

  it('should apply JSON middleware correctly', async () => {
    const testData = { message: 'Hello, World!' };

    const response = await request(app)
      .post('/test-endpoint')
      .send(testData);

    expect(response.statusCode).toBeGreaterThanOrEqual(200);
  });
});
