var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var userSchema = new Schema({
  name: {
    first: { type: String },
    last: { type: String }
  },
  email: { type: String },
  username: { type: String },
  password: { type: String },
  tags: { type: Array, default: [] }
});

var receiptSchema = new Schema({
  owner: { type: ObjectId, ref: 'User' },
  title: { type: String },
  date: { type: Date },
  total: { type: Number },
  // dateProcessed: { type: Date, default: Date.now },
  tags: { type: Array, default: [] },
  note: { type: String },
  fspath: { type: String }
});

module.exports = {
    User: mongoose.model('User', userSchema),
    Receipt: mongoose.model('Receipt', receiptSchema)
};
