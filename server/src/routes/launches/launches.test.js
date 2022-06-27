const request = require('supertest');
const app = require('../../app');


describe('Test GET /launches', () => {
    test('should respond with 200 success',async () =>{
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
        
    })
});

describe('Test POST /launches', () => {
    test('should respond with 200 success',() =>{
       
    });

    test('it should catch missing reqd fields',() =>{
       
    });
    test('it should catch invalid date',() =>{
       
    });
})