import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('SubscriptionsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/subscriptions (GET) should return all subscriptions', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/subscriptions')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

/*   it('/api/subscriptions (GET) should return an empty array if no subscriptions exist', async () => {
    // Clear dependent tables first due to foreign key constraints
    const dataSource = app.get(DataSource);
    await dataSource.getRepository('User').clear();
    await dataSource.getRepository('Subscription').clear();

    const res = await request(app.getHttpServer())
      .get('/api/subscriptions')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);

    // Optionally, re-seed or restore data if needed
  }); */

  it('/api/subscriptions/:id (GET) should return 404 for non-existing id', async () => {
    await request(app.getHttpServer())
      .get('/api/subscriptions/00000000-0000-0000-0000-000000000000')
      .expect(404);
  });

  it('/api/subscriptions/:id (GET) should return a subscription for a valid id', async () => {
    const validId = '8d857766-7ba4-4cef-8fab-a8ae38e90c9f';
    const res = await request(app.getHttpServer())
      .get(`/api/subscriptions/${validId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', validId);
    expect(res.body).toHaveProperty('tierName');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('price');
  });

  it('should throw a foreign key constraint error when trying to clear subscriptions with users present', async () => {
    const dataSource = app.get(DataSource);
    let errorCaught = false;
    try {
      await dataSource.getRepository('Subscription').clear();
    } catch (error) {
      errorCaught = true;
      expect(error.message).toMatch(/foreign key constraint|violates foreign key/i);
    }
    expect(errorCaught).toBe(true);
  });

});