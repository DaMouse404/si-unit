var BigNumber = require("bignumber.js");
var siUnit = require('../siunit');
var expect = require('chai').expect;

describe('siunit parser', function() {
  it('handles 0', function() {
    expect(siUnit.toString(0)).to.equal("0");
  });

  it('returns NaN on malformed input', function() {
    expect(siUnit.parse("woof")).to.deep.equal(NaN);
  });

  it('checks for correct units', function() {
    expect(siUnit.parse("100mH", "F")).to.deep.equal(NaN);
  });

  it('returns NaN if non-si unit', function() {
    expect(siUnit.parse("100q")).to.deep.equal(NaN);
  });

  it('returns NaN if non-si and missiing unit', function() {
    expect(siUnit.parse("100", "H")).to.deep.equal(NaN);
  });

  it('parses strings without si units', function() {
    expect(siUnit.parse("100").toFixed(3)).to.equal(BigNumber(100).toFixed(3));
  });

  it('parses string without required units', function() {
    expect(siUnit.parse("100H","H").toFixed(3)).to.equal(BigNumber(100).toFixed(3));
  });

  it('parses si with units', function() {
    expect(siUnit.parse("10mH").toFixed(3)).to.equal(BigNumber(0.010).toFixed(3));
  });
});
