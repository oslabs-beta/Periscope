const { gql } = require('apollo-server-express');
const dataSources = require('./dataSource.js');
const schemaDirectives = require('./schemaDirectives.js');

const typeDefs = gql`
  type Metric {
    internal_ip: String
    node: String
  }

  type ClusterInfo {
    result: [Metric]
  }

  type Query {
    getClusterInfo(queryType: String, queryString: String): ClusterInfo
  }
`;

const resolvers = {
  Query: {
    getClusterInfo (
      parent,
      { queryType, queryString },
      { dataSources },
      info
    ) {
      console.log('query for get clusterinfo called');
      return dataSources.prometheusAPI.withQueryStrings();
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
  schemaDirectives,
  dataSources,
  cors: { credentials: true },
};
