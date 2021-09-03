const fetch = require('node-fetch');
const { spawn } = require('child_process');
// sets equal to default prometheus server URL
const promURL = 'http://127.0.0.1:9090/api/v1/';
// const axios = require('axios');
const portController = {};


//boolean that determines if the port is open
let isPromUp = false;
let isAlertUp = false;


//sets up port forwarding on prometheus server so we can grab data
portController.portForward =  async (req, res, next) => {
  try {
    const process =  await spawn('kubectl', ['--namespace=default', 'port-forward', 'prometheus-prometheus-kube-prometheus-prometheus-0', '9090']);

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
      // if (code === 1) console.log('PROMETHEUS ALREADY IN USE NUM NUM');
      console.log(`child process exited with code ${code}`);
      if (code === 1) {isPromUp = true;
      res.locals.promUp = isPromUp;
      console.log('child process res.locals.promUp: ', res.locals.promUp)
      }
    });

    console.log('returning next')
    return next();
    // return next();
  } catch (err) {
    console.log(err);
    // return next(err);
  }
};

//sets up port forwarding on prometheus server so we can grab data
// portController.portForwardAlert =  async (req, res, next) => {
//   try {
//     const process =  await spawn('kubectl', ['--namespace=default', 'port-forward', 'services/alertmanager-operated', '9093'])

//     await process.stdout.on('data', data => {
//       console.log(`stdout: ${data}`);
//       isAlertUp = true;
//       res.locals.alertUp = isAlertUp;
//       console.log('res.locals.alertUp: ', res.locals.alertUp);
//     });

//     await process.stderr.on('data', (data) => {
//       console.log(`stderr: ${data}`);
//     });

//     await process.on('close', (code)  => {
//       // if (code === 1) console.log('PROMETHEUS ALREADY IN USE NUM NUM');
//       console.log(`child process exited with code ${code}`);
//       if (code === 1) {isAlertUp = true;
//       res.locals.alertUp = alertUp;
//       console.log('child process res.locals.alertUp: ', res.locals.alertUp)
//       }
//     });

//     console.log('returning next')
//     return next();
//     // return next();
//   } catch (err) {
//     console.log(err);
//     // return next(err);
//   }
// };



module.exports = portController;