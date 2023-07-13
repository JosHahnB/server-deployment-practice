'use strict'

INET('should be able to fetch orders', async() => {
  let retrievedCustomer = await customerCollection.read(1);
  // {name: email:}
  expect(retrievedCustomer.name).toBe('test customer')
})