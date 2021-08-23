const fetch = require('node-fetch');

const metricController = {};

const currentDate = Math.floor(Date.now() / 1000);
const startDate = currentDate - 604800;
console.log('date: ', currentDate);

metricController.getMetrics = async (req, res, next) => {
  const query = `http://localhost:9090/api/v1/query?query=sum(rate(container_cpu_usage_seconds_total{image!=""}[2m]))by(pod)&start=${startDate}&end=${currentDate}&step=1m`;

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

metricController.getNodeCPU = async (req, res, next) => {
  const query = `http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{image!=%22%22}[5m]))by(node)&start=${startDate}&end=${currentDate}&step=5m`;

  try {
    console.log('in metricsController.getMetric');
    const response = await fetch(query);
    res.locals.podCPU = await response.json();
    // console.log('locals: ', res.locals.query);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = metricController;
