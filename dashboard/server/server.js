const express = require('express');
const app = express();
const path = require('path');
const prometheusRouter = require('./routes/prometheusRouter');
const metricsRouter = require('./routes/metricsRouter');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.use('/prometheus', prometheusRouter);
app.use('/metrics', metricsRouter);

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
