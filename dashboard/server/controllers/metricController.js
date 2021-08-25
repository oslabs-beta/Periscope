const fetch = require('node-fetch');

const metricController = {};

const currentDate = Math.floor(Date.now() / 1000);
const startDate = currentDate - 21600;
console.log('date: ', currentDate);

metricController.getTotalDisk = async (req, res, next) => {
  // get totalbytes==>  disk usage will be (total-free) / total
  const totalQuery = `http://localhost:9090/api/v1/query?query=sum(node_filesystem_size_bytes)by(instance)`;

  try {
    const response = await fetch(totalQuery);
    res.locals.totalDisk = await response.json();

    return next();
  } catch (err) {
    return next(err);
  }
};

metricController.getFreeDisk = async (req, res, next) => {
  // get the free bytes: time series
  const freeQuery = `http://localhost:9090/api/v1/query_range?query=sum(node_filesystem_free_bytes)by(instance)&start=${startDate}&end=${currentDate}&step=1m`;

  // try/catch block to get free disk data bytes
  try {
    const response = await fetch(freeQuery);
    res.locals.freeDisk = await response.json();

    return next();
  } catch (err) {
    return next(err);
  }
};

metricController.getNodeCPU = async (req, res, next) => {
  const query = `http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{image!=%22%22}[1m]))by(instance)&start=${startDate}&end=${currentDate}&step=1m`;

  try {
    console.log('in metricsController.getMetric');
    const response = await fetch(query);
    res.locals.nodeCPU = await response.json();
    // console.log('locals: ', res.locals.query);
    return next();
  } catch (err) {
    return next(err);
  }
};

metricController.getNodeMemory = async (req, res, next) => {
  const query = `http://localhost:9090/api/v1/query?query=sum(container_memory_usage_bytes)by(instance)%20/%20sum(container_spec_memory_limit_bytes)%20by%20(instance)`;

  try {
    const response = await fetch(query);
    res.locals.nodeMemory = await response.json();

    return next();
  } catch (err) {
    return next(err);
  }
};

metricController.getClusterInfo = async (req, res, next) => {
  const query = `http://localhost:9090/api/v1/query?query=kube_node_info`;

  try {
    const response = await fetch(query);
    res.locals.clusterInfo = await response.json();

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = metricController;
