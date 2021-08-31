const express = require('express');

const path = require('path');
const prometheusRouter = require('./routes/prometheusRouter');
const metricsRouter = require('./routes/metricsRouter');
const PORT = 3000;
const { ApolloServer } = require('apollo-server-express');
const schema = require('./graphQL/schemas.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/build', express.static(path.resolve(__dirname, '../build')));

// app.use('/prometheus', prometheusRouter);

// app.use('/metrics', metricsRouter);

let apollo = null;
async function startApolloServer(schema) {
  apollo = new ApolloServer(schema);
  await apollo.start();
  apollo.applyMiddleware({ app });
  console.log('apollo server listening');
}

startApolloServer(schema);

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

// app.use('/*', (req, res) => {
//   return res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
  console.log(`Server gql path is ${apollo.graphqlPath}`);
});
