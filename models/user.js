var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async'),
    path = require('path'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    config = require('../config.json');
    // ObjectId = Schema.ObjectId;

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

UserSchema.methods.createReceiptFolders = function (cb) {
  var that = this;
  var folder = path.join(config.user_data.folder, this._id.toString(), '_in');

  mkdirp(folder, function (err) {
    if (err) { return cb(err); }
    console.log('created new user folder for: ' + that._id.toString());
    return cb(null);
  });
};

// exports

exports.User = User = mongoose.model('User', UserSchema);
