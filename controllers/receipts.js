var models = require('../app/models'),
    md5 = require('MD5'),
    userDirs = require('../lib/userDirs');

exports.index = function(req, res) {
  var query = {owner: req.params.uid},
      project = {owner: 0, fspath: 0};

  models.Receipt.find(query, project, function(err, receipts) {
    if (err) { console.error(err); }
    if (receipts) {
      res.json(receipts);
    }
    else {
      res.json({error: 'Error finding receipts.'});
    }
  });
};

// exports.create = function(req, res) {
//   var newUser = new models.User(req.body);
//   newUser.save(function(err, user) {
//     if (err) {
//       res.json({error: 'Error adding user.'});
//     } else {
//       res.json(user);
//       userDirs.create(user._id.toString());
//     }
//   });
// };

exports.show = function(req, res) {
  var query = {owner: req.params.uid, _id: req.params.rid},
      project = {owner: 0, fspath: 0};

  models.Receipt.find(query, project, function(err, receipt) {
    if (err) { console.error(err); }
    if (receipt) {
      res.json(receipt);
    }
    else {
      res.json({error: 'Error finding receipt.'});
    }
  });
};

exports.update = function(req, res) {
  var query = {owner: req.params.uid, _id: req.params.rid},
      project = {owner: 0, fspath: 0};

  models.Receipt.findOneAndUpdate(query, req.body, function(err, receipt) {
    if (err) { console.error(err); }
    if (receipt) {
      receipt = receipt.toObject();
      delete receipt.owner;
      delete receipt.fspath;
      res.json(receipt);
    }
    else {
      res.json({error: 'Error updating receipt.'});
    }
  });
};

exports.destroy = function(req, res) {
  var query = {owner: req.params.uid, _id: req.params.rid},
      project = {owner: 0, fspath: 0};

  models.Receipt.findOneAndRemove(query, function(err, removed) {
    if (err) { console.error(err); }
    if (removed) {
      res.json(200, {status: 'Success'});
    }
    else {
      res.json({error: 'Error removing receipt.'});
    }
  });
};
