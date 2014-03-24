var mongoose = require('mongoose'),
    models = require('./models'),
    md5 = require('MD5');

module.exports = {
  check: function() {
    models.Contact.find({}, function(err, contacts) {
      if (contacts.length === 0) {
        console.log('no contacts found, seeding...');
        var newContactsList = [
          {
            email: 'jkat98@gmail.com',
            name: {
              first: 'Jason',
              last: 'Krol'
            },
            phone: '215-123-1234',
            gravatar: md5('jkat98@gmail.com')
          },
          {
            email: 'testerson@example.com',
            name: {
              first: 'Steve',
              last: 'Testerson'
            },
            phone: '215-123-1234',
            gravatar: md5('testerson@example.com')
          },
          {
            email: 'nancy@testerson.com',
            name: {
              first: 'Nancy',
              last: 'Testerson'
            },
            phone: '215-123-1234',
            gravatar: md5('nancy@testerson.com')
          }
        ];

        newContactsList.forEach(function (contact) {
          new models.Contact(contact).save(function (err, contact) {
            console.log('successfully inserted contact: ' + contact._id);
          });
        });

      } else {
        console.log('found ' + contacts.length + ' existing contacts!');
      }
    });
  }
};
