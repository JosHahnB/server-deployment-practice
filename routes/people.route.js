'use strict'

// import the stuff we need
// express router - express
const express = require('express');
const { People } = require('../models/index.js')
// const { People } from our model index

// the router method is the umbrella for all things having to do with the /people

const router = express.Router();

// RESTful route declarations
router.get('/people', getPeople); //get all records from pepole table
router.get('/people/:id', getOnePerson);
router.post('/people', createPerson);
router.put('/people/:id', updatePerson);
router.delete('/people/:id', deletePerson);

// routehandlers -- all are async because database
async function getPeople(req, res) {
  // search db and return all people
  let allPeople = await People.findAll();
  res.status(200).json(allPeople);   
}

async function getOnePerson(req, res) {
  const id = parseInt(req.params.id);
  let retrievedPerson = await People.findOne({ where: { id: id } });
  res.status(200).json(retrievedPerson)
}

async function createPerson(req, res) {
  let newPerson = req.body;
  let savedPerson = await People.create(newPerson);
  res.status(200).json(savedPerson)
}

async function updatePerson(req, res) {
  const id = parseInt(req.params.id);
  const updatedPersonObj = req.body;
  // find current rec associated with that person
  let retrievedPerson = await People.findOne({ where: { id: id } });
  // update the record
  let updatedPerson = await retrievedPerson.update(updatedPersonObj);
  res.status(200).json(updatedPerson);
}

async function deletePerson(req, res) {
  const id = parseInt(req.params.id);
  let deletePerson = await People.destroy({ where:  { id } });
  res.status(204).json(deletePerson);

}
module.exports = router;