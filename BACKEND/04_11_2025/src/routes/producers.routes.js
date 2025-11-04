const express = require("express");
const {
  getProducers,
  postProducer,
} = require("../controllers/producers.controllers");

const producersRoutes = express.Router();

producersRoutes.get("/", getProducers);
producersRoutes.post("/", postProducer);

module.exports = producersRoutes;
