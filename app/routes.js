var home = require('../controllers/home'),
    users = require('../controllers/users');

module.exports.initialize = function(app) {
  app.get('/', home.index);

  app.get('/api/users', users.index);
  app.post('/api/users', users.create);
  app.get('/api/users/:id', users.show);
  // app.put('/api/users/:id', users.update);
  app.delete('/api/users/:id', users.destroy);

  // app.get('/documents', documents.index);
  // app.post('/documents', documents.create);
  // app.get('/documents/:id', documents.show);
  // app.put('/documents/:id', documents.update);
  // app.delete('/documents/:id', documents.destroy);

};
