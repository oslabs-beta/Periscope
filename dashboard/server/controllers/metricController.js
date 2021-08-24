const fetch = require('node-fetch');

const metricController = {};

const currentDate = Math.floor(Date.now() / 1000);
const startDate = currentDate - 604800;
console.log('date: ', currentDate);

metricController.getTotalDisk = async (req, res, next) => {
  // get totalbytes, just need one object. disk usage will be (total-free) / total
  const totalQuery = `http://localhost:9090/api/v1/query?query=sum(node_filesystem_size_bytes)by(instance)`;

  // structure of data
  // data key: result key: [loop through the 3 objects: in each object, grab the metric:instance to get name and then loop through the value key which has all the [time, value] arrays]
  // calculate the rate

  // try/catch block to get total data bytes
  try {
    const response = await fetch(totalQuery);
    res.locals.totalDisk = await response.json();
    console.log('locals: ', res.locals.totalDisk);
    return next();
  } catch (err) {
    return next(err);
  }
};

metricController.getFreeDisk = async (req, res, next) => {
  // gets the last hour worth of data;
  const startTime = currentDate - 3600;
  // get the free bytes: time series
  const freeQuery = `http://localhost:9090/api/v1/query_range?query=sum(node_filesystem_free_bytes)by(instance)&start=${startTime}&end=${currentDate}&step=2m`;

  // try/catch block to get free disk data bytes
  try {
    const response = await fetch(freeQuery);
    res.locals.freeDisk = await response.json();
    console.log('locals: ', res.locals.freeDisk);
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
    res.locals.nodeCPU = await response.json();
    // console.log('locals: ', res.locals.query);
    return next();
  } catch (err) {
    return next(err);
  }
};

metricController.getNodeMemory = async (req, res, next) => {
  const query = `http://localhost:9090/api/v1/query?query=sum(container_memory_usage_bytes)by(node)%20/%20sum(container_spec_memory_limit_bytes)%20by%20(node)`;

  try {
    const response = await fetch(query);
    res.locals.nodeMemory = await response.json();
    console.log('nodeMemory: ', res.locals.nodeMemory);
    return next();
  } catch (err) {
    return next(err);
  }
};

// metricController.getNodeMemory = async (req, res, next) => {
//   const query = `http://localhost:9090/api/v1/query?query=sum(container_spec_memory_limit_bytes)by(node)`;

//   try {
//     const response = await fetch(query);
//     res.locals.nodeMemory = await response.json();
//     console.log('nodeMemory: ', res.locals.nodeMemory);
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// }

module.exports = metricController;
