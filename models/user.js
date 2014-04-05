var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async'),
    path = require('path'),
    fs = require('fs'),
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
  var userFolder = path.join(config.user_data.folder, this._id.toString());
  
  async.eachSeries([userFolder, userFolder + '/_in'],
    function (folder, done) {
      fs.mkdir(folder, done);
    },
    function (err) {
      if (err) { return cb(err); }
      console.log('created new user folders for: ' + that._id.toString());
    }
  );
};

// exports

exports.User = User = mongoose.model('User', UserSchema);
