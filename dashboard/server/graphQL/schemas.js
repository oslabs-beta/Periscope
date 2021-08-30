const { gql } = require('apollo-server-express');
const dataSources = require('./dataSources.js');
const schemaDirectives = require('./schemaDirectives.js');

const typeDefs = gql`
  type ClusterInfoMetric {
    internal_ip: String
    node: String
  }

  type ClusterInfoNode {
    metric: ClusterInfoMetric
  }

  type Instance {
    instance: String
  }

  type CpuInfoNode {
    metric: Instance
    values: [[String]]
  }

  type MemoryInfoNode {
    metric: Instance
    value: [String]
  }

  type TotalDiskNode {
    metric: Instance
    value: [String]
  }

  type FreeDiskNode {
    metric: Instance
    values: [[String]]
  }

  type ClusterInfoDataObject {
    result: [ClusterInfoNode]
  }

  type CpuInfoDataObject {
    result: [CpuInfoNode]
  }

  type MemoryInfoDataObject {
    result: [MemoryInfoNode]
  } 

  type TotalDiskDataObject {
    result: [TotalDiskNode]
  } 

  type FreeDiskDataObject {
    result: [FreeDiskNode]
  } 

  type ClusterInfo {
    data: ClusterInfoDataObject
  }

  type CpuInfo {
    data: CpuInfoDataObject
  }

  type MemoryInfo {
    data: MemoryInfoDataObject
  }

  type TotalDiskInfo {
    data: TotalDiskDataObject
  }

  type FreeDiskInfo {
    data: FreeDiskDataObject
  }

  type Query {
    getClusterInfo: ClusterInfo
    getNodeCpu(startTime: Int, endTime: Int, step: String): CpuInfo,
    getNodeMemory: MemoryInfo,
    getTotalDiskSpace: TotalDiskInfo,
    getFreeDiskSpace(startTime: Int, endTime: Int, step: String): FreeDiskInfo,
  }
`;

const resolvers = {
  Query: {
    getClusterInfo: async (parent, args, { dataSources }, info) => {
      console.log('query for get clusterinfo called');
      return dataSources.prometheusAPI.getClusterInfo();
    },
    getNodeCpu: async (
      parent,
      { startTime, endTime, step },
      { dataSources },
      info
    ) => {
      console.log('query for getNodeCpu called');
      return dataSources.prometheusAPI.getNodeCpu(startTime, endTime, step);
    },
    getNodeMemory: async (parent, args, {dataSources}, info) => {
      console.log('query for node memory')
      return dataSources.prometheusAPI.getNodeMemory()
    },
    getTotalDiskSpace: async (parent, args, {dataSources}, info) => {
      console.log('query for total disk space')
      return dataSources.prometheusAPI.getTotalDiskSpace();
    },
    getFreeDiskSpace: async (parent, {startTime, endTime, step}, {dataSources}, info) => {
      console.log('query for free disk space')
      return dataSources.prometheusAPI.getFreeDiskSpace(startTime, endTime, step);
    }
  },
};

module.exports = {
  typeDefs,
  resolvers,
  dataSources,
  cors: { credentials: true },
  introspection: true,
};
