import supertest from 'supertest';
const request = supertest('http://dummy.restapiexample.com/api/v1/');

import { expect } from 'chai';

describe.only('Employees1', () => {
  let empId;

  describe('POST', () => {
    it('/create', () => {
      const data = {
        name: `name${Math.floor(Math.random() * 9999)}`,
        //name: "Ldiki",
        salary: 9090,
        age   : "21"
      };
      return request
        .post('create')
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
          empId = res.body.data.id;
         
        });
    });
  });

  describe('GET', () => {
    it('/employees', () => {
      return request.get(`employees?`).then((res) => {
        expect(res.body.data).to.not.be.empty;
      });
    });

    it('/employee/{id}', () => {
      return request
        .get(`employee/${empId}`)
        .then((res) => {
          expect(res.body.data.id).to.be.eq(empId);
        });
    });
  });

  describe('PUT', () => {
    it('/update/{id}', () => {
      const data = {
        name: "Mhahha" ,
        salary: Math.floor(Math.random() * 99999),
      };

      return request
        .put(`update/${empId}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
        });
    });
  });

  describe('DELETE', () => {
    it('/delete/{id}', () => {
      return request
        .delete(`delete/${empId}`)
        .then((res) => {
          expect(res.body.status).to.be.eq("success");
        });
    });
  });
});
