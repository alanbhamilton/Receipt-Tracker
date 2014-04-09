var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ReceiptSchema = new Schema({
  owner: { type: ObjectId, ref: 'User' },
  title: { type: String },
  date: { type: Date },
  total: { type: Number },
  fullText: { type: String },
  dateProcessed: { type: Date, default: Date.now },
  tags: { type: Array, default: [] },
  note: { type: String },
  fspath: { type: String }
});

exports.Receipt = Receipt = mongoose.model('Receipt', ReceiptSchema);
