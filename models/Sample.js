var mongoose = require('mongoose');

var SampleSchema = new mongoose.Schema
(
  {
  _id: String,
  value: Number
  },
    {
    collection: 'death_counts'
    }
);

mongoose.model('Sample', SampleSchema);
