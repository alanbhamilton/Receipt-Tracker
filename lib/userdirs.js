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
  models.User.find({}, {'_id': 1}, function(err, users) {
    if (err) { return console.error(err); }
    users.forEach(function(user) {
      var userFolder = path.join(config.user_data.folder, user._id.toString());
      checkForNewReceipts(path.join(userFolder, '_in'), function (err, receipt) {
        if (err) { return console.error(err); }
        if (!receipt) { return; }
        logProperties(receipt);
        return;
      });
    });
  });
}

// =============================================================
//
// Handle checking for new receipts
//
// =============================================================

function checkForNewReceipts(imagesPath, callback) {
  if (procQueue) { return callback(null, null); }
  fs.readdir(imagesPath, function (err, newFiles) {

    if (err) { callback(err, null); }
    if (!newFiles) { callback(null, null); }
    newFiles.forEach(function (fileName) {
      // only look for files supported by leptonica
      var regex = /^.+\.(jpg|jpeg|png|tiff|bmp|pnm|gif|ps|pdf|webp)$/;
      if (!regex.test(fileName)){
        return callback(null, null);
      }

      console.log('found new file: ' + fileName);
      procQueue += 1;
      ocr.receipt(path.join(imagesPath, fileName), function (err, receipt) {
        procQueue -= 1;
        if (err) { console.error(err); }
        receipt.newFile = fileName;
        return callback(null, receipt);
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
