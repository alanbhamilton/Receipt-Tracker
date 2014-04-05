var User = require('../models/user').User,
    md5 = require('MD5'),
    userDirs = require('../lib/userDirs');

exports.index = function(req, res) {
  User.find({}, {password: 0}, function(err, users) {
    res.json(users);
  });
};

exports.create = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err) {
      res.json({error: 'Error adding user.'});
    } else {
      res.json(user);
      userDirs.create(user._id.toString(), function (err) {
        if (err) { console.error(err); }
      });
    }
  });
};

exports.show = function(req, res) {
  User.find({ _id: req.params.id }, function(err, user) {
    if (err) {
      res.json({error: 'User not found.'});
    } else {
      res.json(user);
    }
  });
};

// exports.update = function(req, res) {
//     console.log(req.body);
//     User.update({ _id: req.body.id }, req.body, function(err, updated) {
//         if (err) {
//             res.json({error: 'User not found.'});
//         } else {
//             res.json(updated);
//         }
//     })
// },

exports.destroy = function(req, res) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      res.json({error: 'User not found.'});
    } else {
      user.remove(function(err, user){
        res.json(200, {status: 'Success'});
      });
    }
  });
};
