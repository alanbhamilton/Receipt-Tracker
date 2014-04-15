var find = require('../../lib/findinstring');

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

  describe('#parseMonth()', function () {
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

  describe('#date()', function () {
    // standard test cases
    it('finds date 01/30/2014', function () {
      var results = find.date('01/30/2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 01/30/14', function () {
      var results = find.date('01/30/14');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date jan 30, 2014', function () {
      var results = find.date('jan 30, 2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date jan/30/2014', function () {
      var results = find.date('jan/30/2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date jan/30/14', function () {
      var results = find.date('jan/30/14');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date January 30, 2014', function () {
      var results = find.date('January 30, 2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date January/30/14', function () {
      var results = find.date('January/30/14');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 30/01/2014', function () {
      var results = find.date('30/01/2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 30/01/14', function () {
      var results = find.date('30/01/14');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 30 jan 2014', function () {
      var results = find.date('30 jan 2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 30 January 2014 ', function () {
      var results = find.date('30 January 2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 2014/01/30', function () {
      var results = find.date('2014/01/30');
      expect(results.getTime()).to.equal(1391058000000);
    });

    // extra test cases
    it('finds date aaa30 January 2014bbb', function () {
      var results = find.date('aaa30 January 2014bbb');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date ttt30/01/2014ttt', function () {
      var results = find.date('ttt30/01/2014ttt');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 000january 30, 2014zzz', function () {
      var results = find.date('000january 30, 2014zzz');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date xyzjan/30/2014xyz', function () {
      var results = find.date('xyzjan/30/2014xyz');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date xyz2014/01/30xyz', function () {
      var results = find.date('xyz2014/01/30xyz');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 01-30-2014', function () {
      var results = find.date('01-30-2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 01.30.2014', function () {
      var results = find.date('01.30.2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 01 30 2014', function () {
      var results = find.date('01 30 2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('finds date 1 30 2014', function () {
      var results = find.date('1 30 2014');
      expect(results.getTime()).to.equal(1391058000000);
    });
    it('does not find date Jan 30, 2009 over 5 years past', function () {
      var results = find.date('Jan 30, 2009');
      expect(results).to.equal(null);
    });
    it('does not find date 12 30 2020 in the future', function () {
      var results = find.date('12 30 2020');
      expect(results).to.equal(null);
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
