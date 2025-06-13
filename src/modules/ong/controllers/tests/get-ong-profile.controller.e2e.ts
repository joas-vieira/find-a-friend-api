import { app } from '@/app';
import { createAndAuthenticateOngUtil } from '@/utils/create-and-authenticate-ong.util';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('GetOngProfileController', () => {
  beforeAll(async () => await app.ready());

  afterAll(async () => await app.close());

  it('should be able to get the profile of an authenticated ong', async () => {
    const { token } = await createAndAuthenticateOngUtil(app);

    const response = await request(app.server)
      .get('/ong/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        ong: expect.objectContaining({
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      }),
    );
  });
});
