const fetch = require('node-fetch');
const { spawn } = require('child_process');
// sets equal to default prometheus server URL
const promURL = 'http://127.0.0.1:9090/api/v1/';
// const axios = require('axios');
const portController = {};


//boolean that determines if the port is open
let isPromUp = false; 


//sets up port forwarding on prometheus server so we can grab data
portController.portForward =  async (req, res, next) => {
  try {
    const process =  await spawn('kubectl', ['--namespace=default', 'port-forward', 'prometheus-prometheus-kube-prometheus-prometheus-0', '9090'])

    await process.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
      isPromUp = true;
      res.locals.promUp = isPromUp; 
      console.log('res.locals.promUP: ', res.locals.promUp);
    });

    await process.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    await process.on('close', (code) => {
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



portController.isUp = async (req, res, next) => {
  const currentDate = new Date().toISOString();
  const queryStr = `http://localhost:9090/api/v1/query?query=up`;
  const query = `http://localhost:9090/api/v1/query?query=sum(rate(container_cpu_usage_seconds_total{image!=""}[2m]))by(pod)&start=${currentDate}&end=${currentDate}&step=1m`;


  try {
    console.log('promUp?: ', isPromUp);
    if (!isPromUp)  {
      const result = await portForward();
      console.log('portForward running? ', result);
    }
    //if (!isPromUp) console.log('something is wrong with isPromUp');
    console.log('got to response')
    const response = await fetch(query);
    res.locals.query = await response.json();
    console.log('locals: ', res.locals.query);
    return next();
  } catch (err) {
    return next(err);
  }
};


module.exports = portController;