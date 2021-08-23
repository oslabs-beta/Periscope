const express = require('express');
const metricsRouter = express.Router();
const metricController = require('../controllers/metricController');

metricsRouter.get('/', metricController.getNodeCPU, (req, res) => {
  res.status(200).json(res.locals.query);
});

module.exports = metricsRouter;
