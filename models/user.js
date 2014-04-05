var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var userSchema = new Schema({
  name: {
    first: { type: String },
    last: { type: String }
  },
  email: { type: String },
  password: { type: String },
  tags: { type: Array, default: [] }
});

exports.User = User = mongoose.model('User', userSchema);
