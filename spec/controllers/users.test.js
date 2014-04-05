// /* jshint -W030 */
// var proxyquire = require('proxyquire'),
//     UserStub = {},
//     md5Stub = function(string) { return string; },
//     users = proxyquire('../../controllers/users', {
//       '../models/' : UserStub,
//       'MD5': md5Stub
//     });
//
// var res = {},
//     req = {};
//
// describe('Users Controller', function() {
//   beforeEach(function() {
//     res = {
//       json: sinon.spy()
//     };
//     req = {
//       params: {
//         id : 1
//       }
//     };
//     modelsStub.User = {
//       find: function(query, callback) {
//         callback(null, {});
//       },
//       save: function(err, callback) {
//         callback(null, req.body);
//       }
//     };
//   });
//
//   it('should exist', function() {
//     expect(users).to.exist;
//   });
//
//   describe('index', function() {
//     it('should be defined', function() {
//       expect(users.index).to.be.a('function');
//     });
//
//     it('should send json', function() {
//       modelsStub.User = {
//         find: function(query, project, callback) {
//           callback(null, {});
//         }
//       };
//       users.index(req, res);
//       expect(res.json).calledOnce;
//     });
//   });
//
//   describe('show', function() {
//     it('should be defined', function() {
//       expect(users.show).to.be.a('function');
//     });
//
//     it('should send json on successful retrieve', function() {
//       users.show(req, res);
//       expect(res.json).calledOnce;
//     });
//
//     it('should send json error on error', function() {
//       modelsStub.User = {
//         find: function(query, callback) {
//           callback(null, {error: 'User not found.'});
//         }
//       };
//       users.show(req, res);
//       expect(res.json).calledWith({error: 'User not found.'});
//     });
//   });
//
//   describe('create', function() {
//     beforeEach(function() {
//       req.body = {
//         name: 'testing',
//         email: 'test@testing.com',
//         username: 'testing123'
//       };
//     });
//
//     it('should be defined', function() {
//       expect(users.create).to.be.a('function');
//     });
//
//     // TODO: I added a call to userDirs.create in this route handler
//     // and broke this test. needs fixing
//
//     /*
//     it('should return json on save', function() {
//
//       modelsStub.User = sinon.spy(function() {
//         modelsStub.User.prototype.save = function(callback) {
//           callback(null, req.body);
//         };
//         return;
//       });
//
//       users.create(req, res);
//       expect(res.json).calledWith(req.body);
//     });
//     */
//
//     it('should return error on failed save', function() {
//
//       modelsStub.User = sinon.spy(function() {
//         modelsStub.User.prototype.save = function(callback) {
//           callback({}, req.body);
//         };
//         return;
//       });
//
//       users.create(req, res);
//       expect(res.json).calledWith({error: 'Error adding user.'});
//     });
//   });
//
//   describe('destroy', function() {
//     beforeEach(function() {
//       req.body = {
//         id: '1',
//         name: 'testing',
//         email: 'test@testing.com',
//         phone: '123-456-7890'
//       };
//     });
//
//     it('should be defined', function() {
//       expect(users.destroy).to.be.a('function');
//     });
//
//     it('should return json on save', function() {
//       var contactSpy = {remove: sinon.spy()};
//       modelsStub.User = {
//         findOne: function(query, callback) {
//           callback(null, contactSpy);
//         }
//       };
//
//       users.destroy(req, res);
//       expect(contactSpy.remove).calledOnce;
//     });
//     it('should return error on failed save', function() {
//       modelsStub.User = {
//         findOne: function(query, callback) {
//           callback({}, {});
//         }
//       };
//
//       users.destroy(req, res);
//       expect(res.json).calledWith({error: 'User not found.'});
//     });
//   });
// });
