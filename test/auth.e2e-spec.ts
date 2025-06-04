import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Subscription } from '../src/modules/subscriptions/entities/subscription.entity';
import { User } from '../src/modules/users/entities/user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let testSubscriptionId: string;

  // Test data
  const testUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    licensePlate: string;
    subscriptionId?: string;
  } = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test.user@example.com',
    password: 'Password123!',
    licensePlate: 'TEST123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    dataSource = app.get(DataSource);

    // Clean up any existing test user
    await cleanupTestUser();

    // Create a test subscription or find an existing one
    testSubscriptionId = await setupTestSubscription();
    testUser.subscriptionId = testSubscriptionId;
  });

  afterAll(async () => {
    await cleanupTestUser();
    await app.close();
  });

  //  clean up test user
  async function cleanupTestUser() {
    try {
      await dataSource
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('email = :email', { email: testUser.email })
        .execute();
    } catch (error) {
      console.error('Error cleaning up test user:', error);
    }
  }

  // set up a test subscription
  async function setupTestSubscription(): Promise<string> {
    const subscriptionRepo = dataSource.getRepository(Subscription);

    const existingSubscription = await subscriptionRepo.findOne({
      where: {},
    });

    if (existingSubscription) {
      return existingSubscription.id;
    }

    const testSubscription = subscriptionRepo.create({
      tierName: 'Test Tier',
      description: 'Test subscription for e2e tests',
      price: 9.99,
    });

    const savedSubscription = await subscriptionRepo.save(testSubscription);
    return savedSubscription.id;
  }

  describe('/auth/signup (POST)', () => {
    it('should register a new user and return access token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(testUser)
        .expect(200);

      expect(response.body).toHaveProperty('access_token');
      expect(typeof response.body.access_token).toBe('string');
    });

    it('should return 409 when trying to register with an existing email', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(testUser)
        .expect(409);
    });

    it('should return 400 when validation fails', async () => {
      const invalidUser = { ...testUser, email: 'invalid-email' };
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(invalidUser)
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login successfully with correct credentials', async () => {
      const loginCredentials = {
        email: testUser.email,
        password: testUser.password,
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginCredentials)
        .expect(200);

      expect(response.body).toHaveProperty('access_token');
      expect(typeof response.body.access_token).toBe('string');
    });

    it('should return 401 with incorrect password', async () => {
      const loginCredentials = {
        email: testUser.email,
        password: 'WrongPassword123!',
      };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginCredentials)
        .expect(401);
    });

    it('should return 401 with non-existent email', async () => {
      const loginCredentials = {
        email: 'nonexistent@example.com',
        password: 'Password123!',
      };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginCredentials)
        .expect(401);
    });

    it('should return 400 when validation fails', async () => {
      const invalidCredentials = {
        email: 'invalid-email',
        password: 'Password123!',
      };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(invalidCredentials)
        .expect(400);
    });
  });
});
