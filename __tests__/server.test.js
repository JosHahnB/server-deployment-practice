'use strict'

// import supertest a library that lets us mock a server connection (like.listen) 
//chceckout supertest on github
const supertest = require('supertest');
const { server } = require('../server.js');
const mockRequest = supertest(server);
const { dbInstance } = require('../models/index.js');

const request = supertest(server);

describe('web server', () => {
  beforeAll(async () => {
    await dbInstance.sync();
  });
  afterAll(async () => {
    await dbInstance.drop();
  });
  it('should respond with a 404 on an invalid route', () => {
    return mockRequest.get('/foobar').then((results) => {
      expect(results.status).toBe(404);
    });
  })

  // async/await test are cleaner
  it('should respond with 404 on invalid method', async () => {
const response = await mockRequest.put('/foobar');
expect(response.status).toBe(404);
  });

  it('can create a record', async () => {
    const person = {
      firstName: "sparky",
      lastName: "spoon"
    };

    const response = await mockRequest.post("/people").send(person);
    expect(response.status).toBe(200);

   
    expect(response.body.id).toBeDefined();
    expect(response.body["firstName"]).toEqual("sparky");

   
    Object.keys(person).forEach((key) => {
      expect(person[key]).toEqual(response.body[key]);
    });
  });

  it("can get list of records", async () => {
    const response = await mockRequest.get("/people");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(1);
  });

  // I could test for status and if I got a person object back
  it("can get a record", async () => {
    const response = await mockRequest.get("/people/1");
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual("object");
    expect(response.body.id).toEqual(1);
  });

  it("can update a record", async () => {
    const data = { lastName: "spoon" };
    const response = await mockRequest.put("/people/1").send(data);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual("object");
    expect(response.body.id).toEqual(1);
    expect(response.body.lastName).toEqual("spoon");
  });

  it("can delete a record", async () => {
    const response = await mockRequest.delete("/people/1");
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const getResponse = await mockRequest.get("/people");
    expect(getResponse.body.length).toEqual(0);
  });
});
// import jest. Use jest convention patter of describe, test, expect
describe('basic server functions as expected', () => {
  //all the individual tests for the suite live here
  test ('request to goodbye route sends string goodbye', async () => {
    const response = await request.get('/goodbye');
    expect(response.text).toBe('goodbye');
  });
  test('request to hello route sends string hello with a timestamp', async () => {
    const response = await request.get('/hello');
    expect(response.text).toContain('hello');
  });
  test('handles undefined routes', async () => {
    const response = await request.get('/pizza');
    expect(response.status).toEqual(404)
  });


// TEST PRACTICE




})