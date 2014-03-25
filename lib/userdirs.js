var fs = require('fs'),
    path = require('path'),
    ocr = require('./ocr'),
    models = require('../app/models'),
    config = require('../config.json'),
    procQueue = 0;

// =============================================================
//
// Create a new set of user folders
//
// =============================================================

function create(userID) {
  var userFolder = path.join(config.user_data.folder, userID);
  // TODO: error callbacks?
  fs.mkdir(userFolder, function (err) {
    if (err) { console.error(err); }
    console.log('created: ' + userFolder);
    fs.mkdir(path.join(userFolder, '_in'), function (err) {
      if (err) { console.error(err); }
      console.log('created: ' + path.join(userFolder, '_in'));
    });
  });
}

// =============================================================
//
// Periodic check for new receipts added to user folders
//
// =============================================================

function check() {
  var start, end;

  start = Date.now();
  console.log('start');

  models.User.find({}, {'_id': 1}, function(err, users) {
    if (err) { return console.error(err); }
    users.forEach(function(user) {
      var userFolder = path.join(config.user_data.folder, user._id.toString(), '_in');
      checkForNewReceipts(userFolder, function (err, numAdded) {
        if (err) { return console.error(err); }
        console.log('added ' + numAdded + ' new documents');
        end = (Date.now() - start);
        console.log('process took ' + end + ' ms');
      });
    });
  });
}

// =============================================================
//
//
//
// =============================================================

function checkForNewReceipts(imagesPath, callback) {
  if (procQueue) { return callback(null, 0); }
  fs.readdir(imagesPath, function (err, newFiles) {
    var receiptsAdded = 0;

    if (err) { callback(err, null); }
    if (!newFiles) { callback(null, 0); }
    newFiles.forEach(function (file) {
      // only look for files supported by leptonica
      var regex = /^.+\.(jpg|jpeg|png|tiff|bmp|pnm|gif|ps|pdf|webp)$/;

      if (!regex.test(file)){
        return callback(null, 0);
      }

      console.log('found new file: ' + file);
      procQueue++;
      receiptsAdded++;
      ocr.receipt(path.join(imagesPath, file), function (err, receipt) {
        if (err) { console.error(err); }
        logProperties(receipt);

        if (! --procQueue) {
          return callback(null, receiptsAdded);
        }
      });
    });
  });
}

// =============================================================
//
//
//
// =============================================================

function logProperties(object) {
  if (typeof object === 'object') {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        console.log(prop + ': ' + object[prop]);
      }
    }
  }
}

// =============================================================
//
// Module Exports
//
// =============================================================

module.exports = {
  check: check,
  create: create
};
