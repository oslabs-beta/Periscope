const { spawn } = require('child_process');
const { RESTDataSource } = require('apollo-datasource-rest');
const camelCaseKeys = require('camelcase-keys');
const API_URL = 'http://localhost:9090/api/v1/';

class PrometheusAPI extends RESTDataSource {
  constructor({ isPrometheusUp }) {
    super();
    this.baseURL = API_URL;
    this.isPrometheusUp = isPrometheusUp;
    this.portPrometheus = this.portPrometheus.bind(this);
  }

  portPrometheus = () => new Promise((resolve, reject) => {
    if(this.isPrometheusUp) {
      console.log('isPromUp line 15: ', this.isPrometheusUp);
      resolve(true);
    }

    try {
      console.log('in PortPrometheus');
      const process =  spawn('kubectl', [
        '--namespace=default',
        'port-forward',
        'prometheus-prometheus-kube-prometheus-prometheus-0',
        '9090',
      ]);

      process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        this.isPrometheusUp = true;
        resolve(true);
      });

      process.stderr.on('data', (err) => {
        console.log(`stderr: ${err}`);
      });

      process.on('close', (code) => {
        if (code === 1) resolve(true);
        else {
          console.log(`child process exited with code ${code}`);
          this.isPrometheusUp = false;
        }
      });
    } catch (err) {
      console.log(err);
    }
  })

  async getClusterInfo() {
    console.log('get cluster info called');
    const checkPort = await this.portPrometheus();
    console.log('checkPort: ', checkPort);
    if (!checkPort) return console.log('error porting prometheus');
    let query = 'query?query=kube_node_info';
    const data = await this.get(query);
    return data;
  }

  async getNodeCpu( startTime, endTime, step ) {
    console.log('get nodeCpu called');
    const checkPort = await this.portPrometheus();
    console.log('checkPort: ', checkPort);
    if (!checkPort) return console.log('error porting prometheus');
    let query = `query_range?query=sum(rate(container_cpu_usage_seconds_total{image!=%22%22}[1m]))by(instance)&start=${startTime}&end=${endTime}&step=${step}`;
    const data = await this.get(query);
    return data;
  }

  async getNodeMemory( ) {
    console.log('get node memory called');
    const checkPort = await this.portPrometheus();
    console.log('checkPort: ', checkPort);
    if (!checkPort) return console.log('error porting prometheus');
    let query = 'query?query=sum(container_memory_usage_bytes)by(instance)%20/%20sum(container_spec_memory_limit_bytes)%20by%20(instance)'
    const data = await this.get(query);
    return data;
  }

  async getTotalDiskSpace( ) {
    console.log('get total disk space called');
    const checkPort = await this.portPrometheus();
    console.log('checkPort: ', checkPort);
    if (!checkPort) return console.log('error porting prometheus');
    let query = 'query?query=sum(node_filesystem_size_bytes)by(instance)'
    const data = await this.get(query);
    return data;
  }
  
  async getFreeDiskSpace( startTime, endTime, step ) {
    console.log('get free disk space called');
    const checkPort = await this.portPrometheus();
    console.log('checkPort: ', checkPort);
    if (!checkPort) return console.log('error porting prometheus');
    let query = `query_range?query=sum(node_filesystem_free_bytes)by(instance)&start=${startTime}&end=${endTime}&step=${step}`;
    const data = await this.get(query);
    return data;
  }
}

module.exports = PrometheusAPI;
