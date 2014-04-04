var tesseract = require('node-tesseract');
var find = require('./findInString');

// TODO: try textract as it doesn't seem to strip the newline chars
// TODO: include the raw text blob returned from ocr stage to the receipt object

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
// Parse text blob for receipt properties
//
// =============================================================

function parseReceipt(text, callback) {
  var receipt = {};

  receipt.title = find.title(text);
  receipt.total = find.total(text);
  receipt.date = find.date(text);
  return callback(null, receipt);
}

// =============================================================
//
// Module Exports
//
// =============================================================

module.exports.receipt = receipt;
module.exports.parseReceipt = parseReceipt;
