const express = require('express');
const metricsRouter = express.Router();
const metricController = require('../controllers/metricController');

metricsRouter.get('/', 
  metricController.getNodeCPU, 
  metricController.getTotalDisk, 
  metricController.getFreeDisk, 
  metricController.getNodeMemory, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = metricsRouter;
