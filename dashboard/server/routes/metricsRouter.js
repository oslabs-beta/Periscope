const express = require('express');
const metricsRouter = express.Router();
const metricController = require('../controllers/metricController');

metricsRouter.get('/', metricController.getPodCPU, (req, res) => {
  res.status(200).json(res.locals.query);
});

module.exports = metricsRouter;
