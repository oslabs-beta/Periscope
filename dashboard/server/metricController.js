const Metric = require('./metricModels');
const metricController = {};

metricController.getMetric = async (req, res, next) => {
  try {
    const metrics = await Metric.find({});
    res.locals = { metrics };
  } catch (err) {
    return next({
      log: `metricController.getMetric err: ${err}`,
      message: {
        err: 'Error occurred in metricController.getMetric',
      },
    });
  }
};
;
module.exports = metricController;