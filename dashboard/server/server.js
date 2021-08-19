const express = require('express');
const app = express();
const path = require('path');
const metricController = require('./metricController');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/build', express.static(path.resolve(__dirname, '../build')));
// app.get('/metric', metricController.getMetric, (req, res) => {
//   return res.status(200).json(res.locals.metrics);
// });
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
