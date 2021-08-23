const fetch = require('node-fetch');

const metricController = {};

metricController.getMetrics = async (req, res, next) => {
  const currentDate = new Date().toISOString();
  console.log('date: ', currentDate);
  const query = `http://localhost:9090/api/v1/query?query=sum(rate(container_cpu_usage_seconds_total{image!=""}[2m]))by(pod)&start=${currentDate}&end=${currentDate}&step=1m`;

  try {
    console.log('in metricsController.getMetric');
    const response = await fetch(query);
    res.locals.query = await response.json();
    console.log('locals: ', res.locals.query);
    return next();
  } catch (err) {
    return next(err);
  }
};




module.exports = metricController;