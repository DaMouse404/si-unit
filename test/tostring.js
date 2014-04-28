var BigNumber = require("bignumber.js");
var siUnit = require('../siunit');
var expect = require('chai').expect;

describe('siunit', function() {
  it('errors on non-numeric input', function() {
    expect(function() { siUnit.toString("woof"); }).to.throw(Error);
  });

  it('errors on no arguments', function() {
    expect(function() { siUnit.toString(); }).to.throw(Error);
  });

  it('converts large numbers into si', function() {
    expect(siUnit.toString(1000000)).to.equal("1M");
  });

  it('converts non-scaled numbers into si', function() {
    expect(siUnit.toString(1)).to.equal("1");
  });

  it('converts smaller numbers into si', function() {
    expect(siUnit.toString(0.000000100)).to.equal("100n");
  });

  it('appends units', function() {
    expect(siUnit.toString(0.010, "H")).to.equal("10mH");
    expect(siUnit.toString(1000, "m")).to.equal("1km");
  });

  it('handles 0', function() {
    expect(siUnit.toString(0)).to.equal("0");
  });
});
