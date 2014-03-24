var config = require('../config.json'),
    fs = require('fs'),
    path = require('path'),
    ocr = require('./ocr'),
    dataDir = path.join(__dirname, config.user_data.folder),
    procQueue = 0;

setInterval(function () {
  var start, end;

  if (procQueue) { return; }
  start = Date.now();
  console.log('start');
  checkForNewReceipts(path.join(dataDir, 'alan', '_in'), function (err, numAdded) {
    if (err) { console.error(err); }
    console.log('added ' + numAdded + ' new documents');
    end = (Date.now() - start);
    console.log('process took ' + end + ' ms');
  });
}, 5000);

function checkForNewReceipts(imagesPath, callback) {
  fs.readdir(imagesPath, function (err, newFiles) {
    var receiptsAdded = 0;
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

function logProperties(object) {
  if (typeof object === 'object') {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        console.log(prop + ': ' + object[prop]);
      }
    }
  }
}
