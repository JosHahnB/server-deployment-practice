'use strict'

// import supertest a library that lets us mock a server connection (like.listen) 
//chceckout supertest on github
const supertest = require('supertest');
const server = require('../server.js')

const request = supertest(server);


// import jest. Use jest convention patter of describe, test, expect
describe('basic server functions as expected', () => {
  //all the individual tests for the suite live here
  test ('request to goodbye route sends string goodbye', async () => {
    const response = await request.get('/goodbye');
    expect(response.text).toBe('/goodbye');
  });
  test('handles undefined routes', async () => {
    const response = await request.get('/pizza');
    expect(response.status).toEqual('404')
  });
})