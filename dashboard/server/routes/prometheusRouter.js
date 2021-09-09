/*
 * *****************************************************************************
 * @description: WIP --> Router for port forwarding Prometheus server
 * *****************************************************************************
 */


const express = require('express');
const prometheusRouter = express.Router();
const portController = require('../controllers/portController');

prometheusRouter.get('/', portController.portForward, (req, res) => {
  res.status(200).send(res.locals.promUp);
});

module.exports = prometheusRouter;