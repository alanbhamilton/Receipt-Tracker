var find = require('../../lib/findInString');

describe('find', function () {

  describe('#parseYear()', function () {
    it('parses 2 digit year 80', function () {
      var results = find.parseYear('80');
      expect(results).to.equal(1980);
    });
    it('parses 2 digit year 99', function () {
      var results = find.parseYear('99');
      expect(results).to.equal(1999);
    });
    it('parses 2 digit year 00', function () {
      var results = find.parseYear('00');
      expect(results).to.equal(2000);
    });
    it('parses 2 digit year 79', function () {
      var results = find.parseYear('79');
      expect(results).to.equal(2079);
    });
    it('parses 4 digit year 0000', function () {
      var results = find.parseYear('0000');
      expect(results).to.equal(0);
    });
    it('parses 4 digit year 0099', function () {
      var results = find.parseYear('0099');
      expect(results).to.equal(99);
    });
    it('parses 4 digit year 0100', function () {
      var results = find.parseYear('0100');
      expect(results).to.equal(100);
    });
    it('parses 4 digit year 2130', function () {
      var results = find.parseYear('2130');
      expect(results).to.equal(2130);
    });
  });

  describe('#parseMonth', function () {
    it('parses jan', function () {
      var results = find.parseMonth('jan');
      expect(results).to.equal(1);
    });
    it('parses january', function () {
      var results = find.parseMonth('january');
      expect(results).to.equal(1);
    });
    it('parses JUN', function () {
      var results = find.parseMonth('JUN');
      expect(results).to.equal(6);
    });
    it('parses dec', function () {
      var results = find.parseMonth('dec');
      expect(results).to.equal(12);
    });
    it('parses december', function () {
      var results = find.parseMonth('december');
      expect(results).to.equal(12);
    });
  });

  describe('#date', function () {
    // standard test cases
    it('finds date 06/01/1976', function () {
      var results = find.date('06/01/1976');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date 06/01/76', function () {
      var results = find.date('06/01/76');
      expect(results.getTime()).to.equal(3358209600000);
    });
    it('finds date jun 1, 1976', function () {
      var results = find.date('jun 1, 1976');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date jun/1/1976', function () {
      var results = find.date('jun/1/1976');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date jun/1/76', function () {
      var results = find.date('jun/1/76');
      expect(results.getTime()).to.equal(3358209600000);
    });
    it('finds date june 1, 1976', function () {
      var results = find.date('june 1, 1976');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date june/1/76', function () {
      var results = find.date('june/1/76');
      expect(results.getTime()).to.equal(3358209600000);
    });
    it('finds date 21/06/1976', function () {
      var results = find.date('21/06/1976');
      expect(results.getTime()).to.equal(204177600000);
    });
    it('finds date 21/06/76', function () {
      var results = find.date('21/06/76');
      expect(results.getTime()).to.equal(3359937600000);
    });
    it('finds date 1 jun 1976', function () {
      var results = find.date('1 jun 1976');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date 1 june 1976 ', function () {
      var results = find.date('1 june 1976');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date 1976/06/01', function () {
      var results = find.date('1976/06/01');
      expect(results.getTime()).to.equal(202449600000);
    });

    // extra test cases
    it('finds date aaa1 june 1976bbb', function () {
      var results = find.date('aaa1 june 1976bbb');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date ttt21/06/1976ttt', function () {
      var results = find.date('ttt21/06/1976ttt');
      expect(results.getTime()).to.equal(204177600000);
    });
    it('finds date afhkjaf6/01/1976asdhf', function () {
      var results = find.date('afhkjaf6/01/1976asdhf');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date 000june 1, 1976zzz', function () {
      var results = find.date('000june 1, 1976zzz');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date xyzjun/1/1976xyz', function () {
      var results = find.date('xyzjun/1/1976xyz');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date xyz1976/06/01xyz', function () {
      var results = find.date('xyz1976/06/01xyz');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date 06-01-1976', function () {
      var results = find.date('06-01-1976');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date 06.01.1976', function () {
      var results = find.date('06.01.1976');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date 06 01 1976', function () {
      var results = find.date('06 01 1976');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date 6 1 1976', function () {
      var results = find.date('6 1 1976');
      expect(results.getTime()).to.equal(202449600000);
    });
    it('finds date 12 30 2020', function () {
      var results = find.date('12 30 2020');
      expect(results.getTime()).to.equal(1609304400000);
    });
    it('empty string returns null', function () {
      var results = find.date('');
      expect(results).to.equal(null);
    });
  });

});

/*
mm*dd*yyyy        06/01/1976
mm*dd*yy          06/01/76 (2076)
mmm dd, yyyy      jun 1, 1976
mmm*dd*yyyy       jun/1/1976
mmm*dd*yy         jun/1/76 (2076)
mmmm dd, yyyy     june 1, 1976
mmmm*dd*yy        june/1/76 (2076)
dd*mm*yyyy        01/06/1976
dd*mm*yy          01/06/76 (2076)
dd mmm yyyy       1 jun 1976
dd mmmm yyyy      1 june 1976
yyyy*mm*dd        1976/06/01
*/
