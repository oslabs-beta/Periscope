const express = require('express');
const prometheusRouter = express.Router();
const portController = require('../controllers/portController');
// const metricsController = require('../controllers/metricsController');


// getting metrics 
prometheusRouter.get('/', portController.isUp, (req, res) => {
  res.status(200).send(res.locals.query);
});

module.exports = prometheusRouter;