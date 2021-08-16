const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://selilac:1234@cluster0.hcthe.mongodb.net/periscope?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'periscope',
})
  .then(() => {
    console.log('Connected to Mongo DB.');
  })
  .catch((err) => {
    console.log(err);
  });

  const Schema = mongoose.Schema;

  const messageSchema = new Schema({
    user: String,
    message: String,
  }, {timestamps: true});

  module.exports = mongoose.model('Message', messageSchema);