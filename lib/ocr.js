var textract = require('textract');
var find = require('./findInString');

// =============================================================
//
// OCR and process receipt image file
//
// =============================================================

function receipt(imagePath, callback) {
  var config = { preserveLineBreaks: true };

  textract(imagePath, config, function(err, text) {
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
  receipt.fullText = text;
  return callback(null, receipt);
}

// =============================================================
//
// Module Exports
//
// =============================================================

module.exports.receipt = receipt;
module.exports.parseReceipt = parseReceipt;
