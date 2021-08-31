const PrometheusAPI = require('./dataSource.js');

const memory = {
  isPrometheusUp: false,
}

module.exports = () => {
    return {
      prometheusAPI: new PrometheusAPI(memory),
    };
  };