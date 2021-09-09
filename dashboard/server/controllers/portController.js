/*
 * ******************************************************************************************
 * @description: Controller that activates our Kubernetes portforwarding
 * ******************************************************************************************
 */

const fetch = require('node-fetch');
const { spawn } = require('child_process');
const portController = {};


//boolean that determines if the port is open
let isPromUp = false;
let isAlertUp = false;


portController.portForward =  async (req, res, next) => {
  try {
    //sets up port forwarding on prometheus server so we can grab data
    const process =  await spawn('kubectl', ['--namespace=default', 'port-forward', 'prometheus-prometheus-kube-prometheus-prometheus-0', '9090']);

    // sets up portforwarding for alert manager
    const process2 = spawn('kubectl', [
      '--namespace=default',
      'port-forward',
      'services/alertmanager-operated',
      '9093',
    ])

    await process.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
      isPromUp = true;
      res.locals.promUp = isPromUp;
      console.log('res.locals.promUP: ', res.locals.promUp);
    });

    await process.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    await process.on('close', (code)  => {
      console.log(`child process exited with code ${code}`);
      if (code === 1) {isPromUp = true;
      res.locals.promUp = isPromUp;
      console.log('child process res.locals.promUp: ', res.locals.promUp)
      }
    });

    console.log('returning next')
    return next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = portController;