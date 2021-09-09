/*
 * *****************************************************************************
 * @description: WIP --> Router for alert manager
 * *****************************************************************************
 */

const express = require('express');
const alertsRouter = express.Router();
const alertsController = require('../controllers/alertsController');

alertsRouter.post('/', alertsController.createAlert, (req, res) => {
  res.status(200).send('Alert Created!');
});

module.exports = alertsRouter;