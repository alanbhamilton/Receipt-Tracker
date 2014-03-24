var home = require('../controllers/home'),
    users = require('../controllers/users');

module.exports.initialize = function(app) {
  app.get('/', home.index);
  app.get('/api/users', users.index);
  app.get('/api/users/:id', users.getById);
  app.post('/api/users', users.add);
  // app.put('/api/users', users.update);
  app.delete('/api/users/:id', users.delete);
};
