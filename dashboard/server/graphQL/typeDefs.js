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
  metric: ClusterInfoMetric,
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
}

type Query {
  getClusterInfo: ClusterInfo
  getNodeCpu(startTime: String, endTime: String, step: String): NodeInfo,
  getNodeMemory: NodeInfo,
  getTotalDiskSpace: NodeInfo,
  getFreeDiskSpace(startTime: String, endTime: String, step: String): NodeInfo,
}
`;