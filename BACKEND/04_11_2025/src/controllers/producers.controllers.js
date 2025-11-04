const Producer = require("../models/producer.model");

const getProducers = async (req, res, next) => {
  try {
    const producers = await Producer.find().populate("movies");
    res.status(200).json(producers);
  } catch (error) {
    res.status(500).json({ error: "No se pueden traer las productoras" });
  }
};

const postProducer = async (req, res, next) => {
  try {
    const newProducer = new Producer(req.body);
    const savedProducer = await newProducer.save();
    res.status(201).json(savedProducer);
  } catch (error) {
    res.status(500).json({ error: "No se ha podido crear la productora" });
  }
};

module.exports = { getProducers, postProducer };
