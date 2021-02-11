import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('http://dummy.restapiexample.com/api/v1/');

describe('Employees', () => {
  it('GET /employees', () => {
    
    return request.get(`employees?`).then((res) => {
       console.log(res.body.data.id, 'all emp id');
      expect(res.body.data).to.not.be.empty;
    });
  });

  it('GET /employee/:id', () => {
    return request.get(`employee/5`).then((res) => {
        console.log(res.body.data.id, 'my id');
      expect(res.body.data).to.not.be.empty;
    });
  });
  it('POST /create', () => {
    const data = {
        name  : "ashyu",
        salary: "6789",
        age   : "39"
    };
    return request
      .post('create')
      .send(data)
      .then((res) => {
        console.log(res.body,'my body');
        expect(res.body.data).to.deep.include(data);
      });
  });
  it('PUT /update/{id}', () =>{
      const data ={
        name  : "tageklrt",  
        salary: 4149,
        age   : "19"      
      };
      return request
      .put('update/19')
      .send(data)
      .then((res) => {
          console.log(res.body,'mygui'),
          expect(res.body.data).to.deep.include(data);
      });
  });
  it('DELETE /delete/{id}', () => {
    return request
      .delete('delete/718')
      .then((res) => {
        console.log(res['body'],'muhji');
        expect(res.body.status).to.be.eq("success");
      });
  });
});