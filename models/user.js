var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // ObjectId = Schema.ObjectId,
    path = require('path'),
    mkdirp = require('mkdirp'),
    config = require('../config.json');

// the schema

var UserSchema = new Schema({
  name: {
    first: { type: String },
    last: { type: String }
  },
  email: { type: String },
  password: { type: String },
  tags: { type: Array, default: [] }
});

// methods

UserSchema.methods.checkForNewReceipts = function (cb) {
  var id = this._id.toString();
  var folder = path.join(config.user_data.folder, id, '_in');

};

UserSchema.methods.createReceiptFolders = function (cb) {
  var id = this._id.toString();
  var folder = path.join(config.user_data.folder, id, '_in');

  mkdirp(folder, function (err) {
    if (err) { return cb(err); }
    console.log('created new user folder for: ' + id;
    return cb(null);
  });
};

// exports

exports.User = User = mongoose.model('User', UserSchema);
