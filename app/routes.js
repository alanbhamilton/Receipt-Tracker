var home = require('../controllers/home'),
    users = require('../controllers/users'),
    receipts = require('../controllers/receipts'),
    image = require('../controllers/image');

module.exports.initialize = function(app) {
  app.get('/', home.index);

  app.get('/api/users', users.index);
  app.post('/api/users', users.create);
  app.get('/api/users/:id', users.show);
  // app.put('/api/users/:id', users.update);
  app.delete('/api/users/:id', users.destroy);

  app.get('/api/users/:uid/receipts', receipts.index);
  // app.post('/api/users/:uid/receipts', receipts.create);
  app.get('/api/users/:uid/receipts/:rid', receipts.show);
  app.put('/api/users/:uid/receipts/:rid', receipts.update);
  app.delete('/api/users/:uid/receipts/:rid', receipts.destroy);

  app.get('/api/users/:uid/receipts/:rid/image', image.show);
};
