var models = require('../app/models'),
    md5 = require('MD5'),
    userDirs = require('../lib/userDirs');

module.exports = {
  index: function(req, res) {
    models.User.find({}, function(err, data) {
      res.json(data);
    });
  },
  getById: function(req, res) {
    models.User.find({ _id: req.params.id }, function(err, user) {
      if (err) {
        res.json({error: 'User not found.'});
      } else {
        res.json(user);
      }
    });
  },
  add: function(req, res) {
    var newUser = new models.User(req.body);
    // newContact.gravatar = md5(newContact.email);
    newUser.save(function(err, user) {
      if (err) {
        res.json({error: 'Error adding user.'});
      } else {
        res.json(user);
        userDirs.create(user._id.toString());
      }
    });
  },
  // update: function(req, res) {
  //     console.log(req.body);
  //     models.User.update({ _id: req.body.id }, req.body, function(err, updated) {
  //         if (err) {
  //             res.json({error: 'User not found.'});
  //         } else {
  //             res.json(updated);
  //         }
  //     })
  // },
  delete: function(req, res) {
    models.User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) {
        res.json({error: 'User not found.'});
      } else {
        user.remove(function(err, user){
          res.json(200, {status: 'Success'});
        });
      }
    });
  }
};
