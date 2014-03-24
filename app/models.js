var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var User = new Schema({
  name: {
    first:   { type: String },
    last:    { type: String }
  },
  email:     { type: String },
  username:  { type: String },
  password:  { type: String },
  tags:      [ { type: String } ]
});

var Receipt = new Schema({
  user:      {
    type:    ObjectId,
    ref:     'User'
  },
  title:     { type: String },
  date:      { type: Date },
  total:     { type: Number },
  dateAdded: {
    type:    Date,
    default: Date.now
  },
  tags:      [ { type: String } ],
  note:      { type: String },
  fspath:    { type: String }
});

module.exports = {
    User: mongoose.model('User', User),
    Receipt: mongoose.model('Receipt', Receipt)
};
