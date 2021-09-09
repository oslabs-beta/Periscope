/*
 * **********************************************************************************
 * @description: WIP --> Controller for RestAPI pulls for Node metrics (not in use)
 * **********************************************************************************
 */


const express = require('express');
const metricsRouter = express.Router();
const metricController = require('../controllers/metricController');

metricsRouter.get('/',
  metricController.getNodeCPU,
  metricController.getTotalDisk,
  metricController.getFreeDisk,
  metricController.getNodeMemory,
  metricController.getClusterInfo, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = metricsRouter;
