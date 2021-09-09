/*
 * ******************************************************************************************
 * @description: Apollo GraphQL resolvers for all our Nodes & Pods queries 
 * ******************************************************************************************
 */

const resolvers = {
  Query: {
    getClusterInfo: async (parent, args, { dataSources }, info) => {
      return dataSources.prometheusAPI.getClusterInfo();
    },
    getNodeCpu: async (parent, { startTime, endTime, step }, { dataSources }, info) => {
      return dataSources.prometheusAPI.getNodeCpu(startTime, endTime, step);
    },
    getNodeMemory: async (parent, args, { dataSources }, info) => {
      return dataSources.prometheusAPI.getNodeMemory()
    },
    getTotalDiskSpace: async (parent, args, { dataSources }, info) => {
      return dataSources.prometheusAPI.getTotalDiskSpace();
    },
    getFreeDiskSpace: async (parent, {startTime, endTime, step}, { dataSources }, info) => {
      return dataSources.prometheusAPI.getFreeDiskSpace(startTime, endTime, step);
    },
    getPodCpu: async (parent, {startTime, endTime, step}, { dataSources }, info) => {
      return dataSources.prometheusAPI.getPodCpu(startTime, endTime, step);
    },
    getPodMemorySeries: async (parent, {startTime, endTime, step}, { dataSources }, info) => {
      return dataSources.prometheusAPI.getPodMemorySeries(startTime, endTime, step);
    },
    getPodMemoryCurrent: async (parent, args, { dataSources }, info) => {
      return dataSources.prometheusAPI.getPodMemoryCurrent();
    },
    getPodInfo: async (parent, args, { dataSources }, info) => {
      return dataSources.prometheusAPI.getPodInfo();
    }
  },
};

module.exports = resolvers;