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

  // if (procQueue) { return callback(null, null); }
  fs.readdir(folder, function (err, newFiles) {
    if (err) { cb(err, null); }
    if (!newFiles) { callback(null, null); }
    newFiles.forEach(function (fileName) {
      // only look for files supported by leptonica
      var regex = /^.+\.(jpg|jpeg|png|tiff|bmp|pnm|gif|ps|pdf|webp)$/;
      var escaped;
      if (regex.test(fileName)) {
        escaped = fileName.replace(/(\s)/, "\\ ");  //Escape the spaces
      }

      var escaped = fileName.replace(/(\s)/, "\\ ");  //Escape the spaces
      console.log('found new file: ' + fileName);
      // procQueue += 1;
      // ocr.receipt(path.join(imagesPath, escaped), function (err, receipt) {
        // procQueue -= 1;
        // if (err) { callback(err, null, null); }
        // return callback(null, receipt, fileName);
      // });
    });
  });

};

UserSchema.methods.createReceiptFolders = function (cb) {
  var id = this._id.toString();
  var folder = path.join(config.user_data.folder, id, '_in');

  mkdirp(folder, function (err) {
    if (err) { return cb(err); }
    console.log('created new user folder for: ' + id);
    return cb(null);
  });
};

// exports

exports.User = User = mongoose.model('User', UserSchema);
