var find = require('../../lib/findInString');

describe('find', function () {

  describe('#total()', function () {
    it('finds a the largest dollar value', function () {
      var results = find.total('$3.21 $5.99 $100.00 $.01');
      expect(results).to.equal(100.00);
    });
    it('finds price "$.34"', function () {
      var results = find.total('$.34');
      expect(results).to.equal(0.34);
    });
    it('finds price "$ .34"', function () {
      var results = find.total('$ .34');
      expect(results).to.equal(0.34);
    });
    it('finds price "$0.34"', function () {
      var results = find.total('$0.34');
      expect(results).to.equal(0.34);
    });
    it('finds price "$12 34"', function () {
      var results = find.total('$12 34');
      expect(results).to.equal(12.34);
    });
    it('finds price "$ 12.34"', function () {
      var results = find.total('$12.34');
      expect(results).to.equal(12.34);
    });
    it('finds price "$ 12 34"', function () {
      var results = find.total('$ 12 34');
      expect(results).to.equal(12.34);
    });
    it('does not find price "q12.34"', function () {
      var results = find.total('q12.34');
      expect(results).to.not.equal(12.34);
    });
    it('does not find price "$123.1 "', function () {
      var results = find.total('$123.1 ');
      expect(results).to.not.equal(123.1);
    });
    it('does not find price " .34"', function () {
      var results = find.total(' .34');
      expect(results).to.not.equal(0.34);
    });
    it('does not find price "0.34"', function () {
      var results = find.total(' 0.34');
      expect(results).to.not.equal(0.34);
    });
    it('does not find price " 12 34"', function () {
      var results = find.total(' 12 34');
      expect(results).to.not.equal(12.34);
    });
  });

});
