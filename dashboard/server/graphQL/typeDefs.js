const { gql } = require('apollo-server-express');

module.exports = gql`
  type ClusterInfo {
    data: ClusterInfoDataObject
  }
  type ClusterInfoDataObject {
    result: [ClusterInfoNode]
  }
  type ClusterInfoMetric {
    internal_ip: String
    node: String
  }
  type ClusterInfoNode {
    metric: ClusterInfoMetric
    value: [String]
  }

  type NodeInfo {
    data: NodeDataObject
  }
  type NodeDataObject {
    result: [Node]
  }
  type Node {
    metric: Instance
    value: [String]
    values: [[String]]
  }
  type Instance {
    instance: String
    pod: String
  }

  type PodMetaData {
    data: PodDataObject
  }
  type PodDataObject {
    result: [PodMetric]
  }
  type PodMetric {
    metric: PodInfo
  }
  type PodInfo {
    node: String
    pod: String
    pod_ip: String
  }

  type Query {
    getClusterInfo: ClusterInfo
    getNodeCpu(startTime: String, endTime: String, step: String): NodeInfo
    getNodeMemory: NodeInfo
    getTotalDiskSpace: NodeInfo
    getFreeDiskSpace(startTime: String, endTime: String, step: String): NodeInfo
    getPodCpu(startTime: String, endTime: String, step: String): NodeInfo
    getPodMemorySeries( startTime: String, endTime: String, step: String): NodeInfo
    getPodMemoryCurrent: NodeInfo
    getPodInfo: PodMetaData
  }
`;
