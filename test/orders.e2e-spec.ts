import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import db from '../src/config/db';

describe('Orders API (e2e)', () => {
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
    // optionally clean up database
    await db('items').del();
    await db('orders').del();
    await db.destroy();
  });

  it('/order (POST) creates and returns 201', async () => {
    const payload = {
      numeroPedido: 'test123',
      valorTotal: 500,
      dataCriacao: new Date().toISOString(),
      items: [{ idItem: 'i1', quantidadeItem: 2, valorItem: 250 }],
    };
    const res = await request(app.getHttpServer())
      .post('/order')
      .send(payload)
      .expect(201);

    expect(res.body.orderId).toBe('test123');
  });

  it('/order/:id (GET) returns order', async () => {
    const res = await request(app.getHttpServer()).get('/order/test123').expect(200);
    expect(res.body.orderId).toBe('test123');
    expect(res.body.items).toHaveLength(1);
  });
});
