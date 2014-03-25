var find = require('../../lib/findinstring');

describe('find', function () {

  describe('#title()', function () {
    it('ignores spaces at the start of the string', function () {
      var results = find.title('    this is a test55 jersey');
      expect(results).to.equal('this is a test');
    });
    it('does not include the space at the end of the title', function () {
      var results = find.title('this is a test 55 jersey');
      expect(results).to.equal('this is a test');
    });
    it('returns null if no title found', function () {
      var results = find.title('55 jersey');
      expect(results).to.equal(null);
    });
  });

});
