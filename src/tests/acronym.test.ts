import request from 'supertest';
import App from '@/app';
import { CreateDataDto } from '@dtos/users.dto';
import acronymModel from '@models/acronym.model';
import AcronymRoute from '@routes/acronym.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('[GET] /acronym/:acronym', () => {
  it('response statusCode 200 / findOne', () => {
    const userId = 1;
    const findUser: any = acronymModel.find(user => user.id === userId);
    const acronymRoute = new AcronymRoute();
    const app = new App([acronymRoute]);

    return request(app.getServer()).get(`${acronymRoute.path}/${userId}`).expect(200, { data: findUser, message: 'find' });
  });
});

describe('[POST] /acronym', () => {
  it('response statusCode 201 / created', async () => {
    const userData: CreateDataDto = {
      acronym: 'IOT',
      definition: 'Internet Of Thing',
    };
    const acronymRoute = new AcronymRoute();
    const app = new App([acronymRoute]);

    return request(app.getServer()).post(`${acronymRoute.path}`).send(userData).expect(201);
  });
});

describe('[PUT] /acronym/:acronym', () => {
  it('response statusCode 200 / updated', async () => {
    const userId = 1;
    const userData: CreateDataDto = {
      acronym: 'ZZZZ',
      definition: 'test',
    };
    const acronymRoute = new AcronymRoute();
    const app = new App([acronymRoute]);

    return request(app.getServer()).put(`${acronymRoute.path}/${userId}`).send(userData).expect(200);
  });
});

describe('[DELETE] /acronym/:acronym', () => {
  it('response statusCode 200 / deleted', () => {
    const userId = 1;
    const deleteUser: any[] = acronymModel.filter(user => user.id !== userId);
    const acronymRoute = new AcronymRoute();
    const app = new App([acronymRoute]);

    return request(app.getServer()).delete(`${acronymRoute.path}/${userId}`).expect(200, { data: deleteUser, message: 'deleted' });
  });
});
