

const resolvers = {
  Query: {
    getClusterInfo: async (parent, args, { dataSources }, info) => {
      console.log('query for get clusterinfo called');
      return dataSources.prometheusAPI.getClusterInfo();
    },
    getNodeCpu: async (parent, { startTime, endTime, step }, { dataSources }, info) => {
      console.log('query for getNodeCpu called');
      return dataSources.prometheusAPI.getNodeCpu(startTime, endTime, step);
    },
    getNodeMemory: async (parent, args, { dataSources }, info) => {
      console.log('query for node memory')
      return dataSources.prometheusAPI.getNodeMemory()
    },
    getTotalDiskSpace: async (parent, args, { dataSources }, info) => {
      console.log('query for total disk space')
      return dataSources.prometheusAPI.getTotalDiskSpace();
    },
    getFreeDiskSpace: async (parent, {startTime, endTime, step}, { dataSources }, info) => {
      console.log('query for free disk space')
      return dataSources.prometheusAPI.getFreeDiskSpace(startTime, endTime, step);
    }
  },
};

module.exports = resolvers;