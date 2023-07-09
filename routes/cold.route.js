'use strict'

// import the stuff we need
// express router - express
const express = require('express');
const { Cold } = require('../models/index.js');
// const { Cold } from our model index

// the router method is the umbrella for all things having to do with the /Cold

const router = express.Router();

// RESTful route declarations
// router.get('/cold', getcold); //get all records from pepole table
router.get('/cold/:id', getOneCold);
router.post('/cold', createCold);
router.put('cold:id', updateCold);
router.delete('cold:id', deleteCold);

// routehandlers -- all are async because database
async function getCold(req, res) {
  // search db and return all Cold
  let allCold = await Cold.findAll();
  res.status(200).json(allCold);
}

async function getOneCold(req, res) {
  const id = parseInt(req.params.id);
  let retrievedCold = await Cold.findOne({ where: { id: id } });
  res.status(200).json(retrievedCold)
}

async function createPerson(req, res) {
  let newCold = req.body;
  let savedCold = await Cold.create(newCold);
  res.status(200).json(savedCold)
}

async function updateCold(req, res) {
  const id = parseInt(req.params.id);
  const updatedColdObj = req.body;
  // find current rec associated with that Cold
  let retrievedCold = await Cold.findOne({ where: { id: id } });
  // update the record
  let updatedCold = await retrievedCold.update(updatedColdObj);
  res.status(200).json(updatedCold);
}

async function deleteCold(req, res) {
  const id = parseInt(req.params.id);
  let deleteCold = await Cold.destroy({ where:  { id } });
  res.status(204).json(deleteCold);

}
module.exports = router;