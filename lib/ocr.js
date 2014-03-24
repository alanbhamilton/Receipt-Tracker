
var tesseract = require('node-tesseract');
var find = require('./findInString');

// =============================================================
//
// OCR and process receipt image file
//
// =============================================================

function receipt(imagePath, callback) {
  tesseract.process(imagePath, function(err, text) {
    if (err) { callback(err, null); }

    parseReceipt(text, function (err, receipt) {
      if (err) { callback(err, null); }

      callback(null, receipt);
    });
  });
}

// =============================================================
//
// Parse text for receipt properties
//
// =============================================================

function parseReceipt(text, callback) {
  var receipt = {};

  receipt.title = find.title(text);
  if (!receipt.title) {
    receipt.title = null;
  }

  receipt.total = find.total(text);
  if (!receipt.total) {
    receipt.total = null;
  }

  receipt.date = find.date(text);
  if (!(receipt.date instanceof Date && isFinite(receipt.date))) {
    receipt.date = null;
  }

  receipt.processedDate = new Date(Date.now());

  return callback(null, receipt);
}

// =============================================================
//
// Module Exports
//
// =============================================================

module.exports.receipt = receipt;
module.exports.parseReceipt = parseReceipt;
