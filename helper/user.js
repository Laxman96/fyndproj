const supertest = require('supertest');
const request = supertest('http://dummy.restapiexample.com/api/v1/');
const faker = require('faker');


export const createRandomUserWithFaker = async () => {
  const data = {
    name: faker.name.firstName(),
    salary: Math.floor(Math.random() * 99999),
    age   : "22",
  };

  const res = await request
    .post(`/create`)
    .send(data);

  return res.body.data;
};

export const createRandomUser = async () => {
  const data = {
    name: 'Dolphin' + Math.floor(Math.random() * 99999) ,
    salary: 1223,
    age   : "22",
  };
  const res = await request
    .post(`/create`)
    .send(data);
  return res.body.data;
};
