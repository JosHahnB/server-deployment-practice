'use strict';

// collection interface - provide abstration for our CRUD behaviors regardless of our model

class Collection {
  // this is where we pass in our model/schema
  constructor(model) {
    this.model = model;
  }


// CERATE
async create(jsonObj) {
try {
  let record = await this.model.create(jsonObj);
  return record;
} catch (e) {
  console.error(`error when creating data for model: ${this.model.name}`)
}
  }

  async read(id, )
}