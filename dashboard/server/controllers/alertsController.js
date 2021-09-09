/*
 * *****************************************************************************
 * @description: WIP --> Controller for alert manager
 * *****************************************************************************
 */


const fetch = require('node-fetch');

const alertsController = {};

alertsController.createAlert = async () => {

  // get type of alert from frontend

  const url = 'http://localhost:9093/api/v2/alerts/rules';

  fetch(url, {
    method: 'POST',
    headers: 'Content-Type: application/json',
    body: {
    "rules": [
        {
            "alert": "Test Alert",
            "expr": "up == 1",
            "for": "1m",
        }
      ]
    }
  });



{/*
  // if statement to create the alert to send




  // send appropriate alert type to alertmanager api */}


};

modules.export = alertsController;
