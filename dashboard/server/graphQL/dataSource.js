const { spawn } = require('child_process');
const { RESTDataSource } = require('apollo-datasource-rest');
const camelCaseKeys = require('camelcase-keys');
const API_URL = 'http://localhost:9090/api/v1/';

class PrometheusAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_URL;
    this.isPrometheusUp = false;
    this.portPrometheus = this.portPrometheus.bind(this);
  }

  portPrometheus = () => new Promise((resolve, reject) => {

    if(this.isPrometheusUp) resolve(true);
    
    try{
      const process = spawn('kubectl', ['--namespace=default', 'port-forward', 'prometheus-prometheus-kube-prometheus-prometheus-0', '9090']);

      process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        this.isPrometheusUp = true;
        resolve(true);
      })

      process.stderr.on('data', (err) => {
        console.log(`stderr: ${err}`);
      })

      process.on('close', (code) => {
        if (code === 1) resolve(this.isPrometheusUp)
        else {
          console.log(`child process exited with code ${code}`);
          this.isPrometheusUp = false;
        }
      })
    }catch(err){
      console.log(err);
    }

  });


  async getClusterInfo(queryType, queryString) {
    const checkPort = await this.portPrometheus()
    console.log('get cluster info called')
    if(!checkPort) return console.log('error porting prometheus')
    let query = 'query?query=kube_node_info'
    const data = await this.get(query);
    return data;
  }
}

module.exports = () => {
  return dataSources({ prometheusAPI: new PrometheusAPI() });
};
