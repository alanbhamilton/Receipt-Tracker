var fs = require('fs'),
    path = require('path'),
    ocr = require('./ocr'),
    async = require('async'),
    config = require('../config.json'),
    Receipt = require('../models/receipt').Receipt,
    procQueue = 0;

// =============================================================
//
// Periodic check for new receipts added to user folders
//
// =============================================================

function check() {
  User.find({}, {'_id': 1}, function(err, users) {
    if (err) { return console.error(err); }
    users.forEach(function(user) {
      var userFolder = path.join(config.user_data.folder, user._id.toString());
      checkForNewReceipts(path.join(userFolder, '_in'), function (err, receipt, fileName) {
        if (err) { return console.error(err); }
        if (!receipt) { return; }
        logProperties(receipt);
        // create new receipt in db
        // TODO: this is a total mess and needs to be refactored (async module maybe?)
        var newReceipt = new Receipt(receipt);
        newReceipt.owner = user._id;
        newReceipt.save(function (err, receipt, numAffected) {
          if (err) { return console.error(err); }
          var oldFile = path.join(userFolder, '_in', fileName);
          var newFile = path.join(userFolder, receipt._id.toString() + path.extname(fileName));
          fs.rename(oldFile, newFile, function (err) {
            if (err) { return console.error(err); }
            receipt.fspath = newFile;
            receipt.save(function (err) {
              if (err) { return console.error(err); }
              receipt.populate('owner', function (err) {
                if (err) { return console.error(err); }
              });
            });
          });
        });
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
      if (!regex.test(fileName)) { return callback(null, null); }

      var escaped = fileName.replace(/(\s)/, "\\ ");  //Escape the spaces
      console.log('found new file: ' + fileName);
      procQueue += 1;
      ocr.receipt(path.join(imagesPath, escaped), function (err, receipt) {
        procQueue -= 1;
        if (err) { callback(err, null, null); }
        return callback(null, receipt, fileName);
      });
    });
  });
}

// =============================================================
//
// Log all own properties of an object
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
};
