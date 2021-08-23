const fetch = require('node-fetch');

const metricController = {};

const currentDate = Math.floor(Date.now() / 1000);
const startDate = currentDate - 604800;











metricController.getTotalDisk = async (req, res, next) => {

  // get totalbytes, just need one object. disk usage will be (total-free) / total
  const totalQuery = `http://localhost:9090/api/v1/query?query=sum(node_filesystem_size_bytes)by(instance)`

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

}

metricController.getFreeDisk = async (req, res, next) => {

  // get the free bytes: time series
  const freeQuery = `http://localhost:9090/api/v1/query_range?query=sum(node_filesystem_free_bytes)by(instance)&start=${startDate}&end=${currentDate}&step=1m`


  // structure of data
  // data key: result key: [loop through the 3 objects: in each object, grab the metric:instance to get name and then loop through the value key which has all the [time, value] arrays]
  // calculate the rate


  // try/catch block to get free disk data bytes
  try {
    const response = await fetch(freeQuery);
    res.locals.freeDisk = await response.json();
    console.log('locals: ', res.locals.freeDisk);
    return next();
  } catch (err) {
    return next(err);
  }

}





module.exports = metricController;