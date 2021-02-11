require('dotenv').config();
const faker = require('faker');

import request from '../config/supertest';
import { expect } from 'chai';

const {
  createRandomUser,
  createRandomUserWithFaker,
} = require('../helper/user');

describe.only('employees', () => {
  let user, empId;

  before(async () => {
    // user = await createRandomUser();
    user = await createRandomUserWithFaker();
  });

  after(() => {
    // clean up
    // delete a user
  });

  describe('/create', () => {
    it('create', async () => {
      const data = {
        name: faker.name.firstName(),
        salary: Math.floor(Math.random() * 99999),
        age   : Math.floor(Math.random() * 99999),        
      };

      const res = await request
        .post('/create')
        .send(data);

      expect(res.body.data).to.deep.include(data);
      empId = res.body.data.id;
      console.log(empId,'muid');
    });

    // dependent on previous test
    it('/employee/{id}', async () => {
      if (empId) {
        await request
          .get(`employee/${empId}`)
          .expect(200);
      } else {
        throw new Error(`emptId is invalid - ${empId}`);
      }
    });
  });

  describe('Negative Tests', () => {
    it('422 Data validation failed', async () => {
      const data = {
        name: "",
        salary: "9090",
        age   : Math.floor(Math.random() * 99999),
      };

      const res = await request
        .post(`employees`)
        .send(data);

      expect(res.body.code).to.eq(422);
      expect(res.body.data[0].message).to.eq("can't be blank");
    });

    it('401 Authentication failed', async () => {
      const data = {
        name: "Myrpop23",
        salary: "990",
        age   : Math.floor(Math.random() * 99999),
      };

      const res = await request.post(`employees`).send(data);

      expect(res.body.code).to.eq(401);
      expect(res.body.data.message).to.eq('Authentication failed');
    });
  });
});
