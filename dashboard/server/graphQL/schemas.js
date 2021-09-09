/*
 * ******************************************************************************************
 * @description: ????
 * ******************************************************************************************
 */


const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const dataSources = require('./dataSources.js');
const schemaDirectives = require('./schemaDirectives.js');

module.exports = {
  typeDefs,
  resolvers,
  dataSources,
  cors: { credentials: true },
  introspection: true,
};
