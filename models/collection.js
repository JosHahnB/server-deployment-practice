'use strict';

// collection interface - provide abstration for our CRUD behaviors regardless of our model

class Collection {
  // this is where we pass in our model/schema
  constructor(model) {
    this.model = model;
  }


  // CREATE
  async create(jsonObj) {
    try {
      let record = await this.model.create(jsonObj);
      return record;
    } catch (e) {
      console.error(`error when creating data for model: ${this.model.name}`)
    }
  }

  // READ 1 or all
  //unless you have a function that takes arguments and you don't pass them in the function will treat them as though they eval to undefined
  async read(id, options = {}) {
    let records = null;  // if we get one record it will be an object, if there are many it will be an array
    try {
      if (id) {
        options.where = { id: id }
        records = await this.model.findOne(options)
      } else records = await this.model.findAll();
      return records;
    } catch (e) {
      console.error(`error when creating data for model: ${this.model.name}`)
      return e;
    }
  }

  // UPDATE
  async update(id, jsonObj) {
    try {
      if (!id) throw new Error(`No ID provided for the model: ${this.model.name}`);
      // only all valid requests past
      let record = await this.model.findOne({ where: { id } });
      let updatedRecord = await record.update(jsonObj);
      return updatedRecord;
    } catch (e) {
      console.error(`error when creating data for model: ${this.model.name}`)
    }
  }

  // DELETE
  async delete(id) {
    try {
      if (!id) throw new Error(`No ID provided for the model: ${this.model.name}`);
      let deletedRecord = await this.model.destroy({where: {id}});
      return deletedRecord;
    } catch (e) {
      console.error(`error when creating data for model: ${this.model.name}`)

    }
  }
}

module.exports = Collection;   