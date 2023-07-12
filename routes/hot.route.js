'use strict'

// import the stuff we need
// express router - express
const express = require('express');
const { Hot } = require('../models/index.js');

// the router method is the umbrella for all things having to do with the /Hot

const router = express.Router();

// RESTful route declarations
router.get('/hot', getHot); //get all records from pepole table
router.get('/hot/:id', getOneHot);
router.post('/hot', createHot);
router.put('/hot/:id', updateHot);
router.delete('/hot/:id', deleteHot);

// routehandlers -- all are async because database
async function getHot(req, res) {
  // search db and return all Hot
  let allHot = await Hot.findAll();
  res.status(200).json(allHot);
}

async function getOneHot(req, res) {
  const id = parseInt(req.params.id);
  let retrievedHot = await Hot.findOne({ where: { id: id } });
  res.status(200).json(retrievedHot)
}

async function createHot(req, res) {
  let newHot = req.body;
  let savedHot = await Hot.create(newHot);
  res.status(200).json(savedHot)
}

async function updateHot(req, res) {
  const id = parseInt(req.params.id);
  const updatedHotObj = req.body;
  // find current rec associated with that Hot
  let retrievedHot = await Hot.findOne({ where: { id: id } });
  // update the record
  let updatedHot = await retrievedHot.update(updatedHotObj);
  res.status(200).json(updatedHot);
}

async function deleteHot(req, res) {
  const id = parseInt(req.params.id);
  let deleteHot = await Hot.destroy({ where:  { id } });
  res.status(204).json(deleteHot);

}
module.exports = router;