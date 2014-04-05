/* jshint -W030 */
var User = require('../../models/User').User;

describe('User', function() {
  var schema = User.schema.paths;

  it('exists', function() {
    expect(User).to.exist;
  });

  it('has name fields', function() {
    expect(schema['name.first']).to.exist;
    expect(schema['name.first'].instance).to.equal('String');
    expect(schema['name.last']).to.exist;
    expect(schema['name.last'].instance).to.equal('String');
  });

  it('has email string field', function() {
    expect(schema.email).to.exist;
    expect(schema.email.instance).to.equal('String');
  });

  it('has password string field', function() {
    expect(schema.password).to.exist;
    expect(schema.password.instance).to.equal('String');
  });

  // it('has tags array field', function() {
  //   expect(schema.tags).to.exist;
  //   expect(schema.tags.instance).to.equal('Array');
  // });
});
