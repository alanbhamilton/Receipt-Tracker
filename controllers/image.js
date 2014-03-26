var models = require('../app/models');

exports.show = function(req, res) {
  var query = {owner: req.params.uid, _id: req.params.rid};

  // get plain vanilla object since all we need is fspath
  models.Receipt.findOne(query).lean().exec(function(err, receipt) {
    if (err) { console.error(err); }
    if (receipt) {
      res.sendfile(receipt.fspath);
    }
    else {
      res.json({error: 'Error finding image.'});
    }
  });
};
