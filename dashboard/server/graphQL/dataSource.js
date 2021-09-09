/*
 * ******************************************************************************************
 * @description: Apollo GraphQL queries for Nodes
 * ******************************************************************************************
 */

const { spawn } = require('child_process');
const { RESTDataSource } = require('apollo-datasource-rest');
const camelCaseKeys = require('camelcase-keys');
const API_URL = 'http://localhost:9090/api/v1/';

class PrometheusAPI extends RESTDataSource {
  constructor({ isPrometheusUp }) {
    super();
    this.baseURL = API_URL;
  }

  async getClusterInfo() {
    let query = 'query?query=kube_node_info';
    const data = await this.get(query);
    return data;
  }

  async getNodeCpu( startTime, endTime, step ) {
    let query = `query_range?query=sum(rate(container_cpu_usage_seconds_total{image!=%22%22}[${step}]))by(instance)&start=${startTime}&end=${endTime}&step=${step}`;
    const data = await this.get(query);
    return data;
  }

  async getNodeMemory() {
    let query = 'query?query=sum(container_memory_usage_bytes)by(instance)%20/%20sum(container_spec_memory_limit_bytes)%20by%20(instance)'
    const data = await this.get(query);
    return data;
  }

  async getTotalDiskSpace() {
    let query = 'query?query=sum(node_filesystem_size_bytes)by(instance)'
    const data = await this.get(query);
    return data;
  }

  async getFreeDiskSpace( startTime, endTime, step ) {
    let query = `query_range?query=sum(node_filesystem_free_bytes)by(instance)&start=${startTime}&end=${endTime}&step=${step}`;
    const data = await this.get(query);
    return data;
  }

  async getPodCpu( startTime, endTime, step ) {
    let query = `query_range?query=sum(rate(container_cpu_usage_seconds_total[${step}]))by(pod)&start=${startTime}&end=${endTime}&step=${step}`;
    const data = await this.get(query);
    return data;
  }

  async getPodMemorySeries( startTime, endTime, step ) {
    let query = `query_range?query=sum(rate(container_memory_usage_bytes[${step}]))by(pod)&start=${startTime}&end=${endTime}&step=${step}`;
    const data = await this.get(query);
    return data;
  }

  async getPodMemoryCurrent() {
    let query = `query?query=sum(container_memory_usage_bytes)by(pod)`;
    const data = await this.get(query);
    return data;
  }

  async getPodInfo() {
    let query = `query?query=kube_pod_info`;
    const data = await this.get(query);
    return data;
  }
}

module.exports = PrometheusAPI;
