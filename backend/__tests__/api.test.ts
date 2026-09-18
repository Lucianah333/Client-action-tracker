import request from 'supertest';
import app from '../server';

describe('API Endpoints', () => {
  describe('POST /api/actions - Validation Test', () => {
    it('should return 400 Bad Request when title is missing or too short', async () => {
      const invalidPayload = {
        client: 'Test Client',
        title: 'Hi',
        owner: 'Test Owner',
        dueDate: '2026-12-31',
        priority: 'High',
        status: 'Open'
      };

      const response = await request(app)
        .post('/api/actions')
        .send(invalidPayload)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toBeDefined();
      expect(response.body.details).toContainEqual(
        expect.stringContaining('title must be at least 5 characters')
      );
    });

    it('should return 400 Bad Request when title is completely missing', async () => {
      const invalidPayload = {
        client: 'Test Client',
        owner: 'Test Owner',
        dueDate: '2026-12-31',
        priority: 'High',
        status: 'Open'
      };

      const response = await request(app)
        .post('/api/actions')
        .send(invalidPayload)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toBeDefined();
      expect(response.body.details).toContainEqual('title is required');
    });
  });

  describe('PATCH /api/actions/:id - Status Transition Test', () => {
    it('should return 200 and update status to Completed for action A001', async () => {
      const updatePayload = {
        status: 'Completed'
      };

      const response = await request(app)
        .patch('/api/actions/A001')
        .send(updatePayload)
        .expect(200);

      expect(response.body).toHaveProperty('id', 'A001');
      expect(response.body).toHaveProperty('status', 'Completed');
      expect(response.body).toHaveProperty('client');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('owner');
      expect(response.body).toHaveProperty('dueDate');
      expect(response.body).toHaveProperty('priority');
    });

    it('should return 404 when action ID does not exist', async () => {
      const updatePayload = {
        status: 'Completed'
      };

      await request(app)
        .patch('/api/actions/A999')
        .send(updatePayload)
        .expect(404);
    });
  });
});