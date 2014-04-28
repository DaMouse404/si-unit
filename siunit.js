(function(global) {

var values = ["y", "z", "a", "f", "p", "n", "u", "m",
              "",
              "k", "M", "G", "T", "P", "E", "Z", "Y"];

function siUnit(BigNumber) {
  return {
    toString: function siUnitString(num, unit, multi) {
      if ( typeof num == "undefined" || typeof num !== 'number' ) {
        Error("Need a number");
      }
  
      size = BigNumber(num);
      unit = unit || "";
      multi = multi || 1000;

      if ( num === 0 ) {
        return [num, unit].join('');
      }

      var base = Math.floor( Math.min(Math.max(Math.log(num) / Math.log(multi), -8), 8) );
      var index = base + 8;
 
      var based = size.times(Math.pow(multi, base*-1)).toFixed(3).replace(/\.?0+$/, "");
   
      return [ based, values[index], unit ].join('');
    },
    parse: function siUnitParse(str, unit, multi) {
      unit  = unit || "";
      multi = multi || 1000;

      ref = str.match(/(\d+\.?\d+)([a-zA-Z])?([a-zA-Z]+)?/);

      if ( ref === null ) {
        return NaN;
      }

      var scale = ref[2];

      if ( unit.length && unit !== ref[3] ) {
        if ( typeof ref[3] === 'undefined' ) {
          if ( unit === ref[2] ) {
            scale = "";
          } else {
            return NaN;
          }
        } else {
          return NaN;
        }
      }

      var num = parseFloat(ref[1]);
      var size = BigNumber(num);
      var index = null;
      var base;

      if ( typeof scale === "undefined" ) {
        index = 8;
      } else {
        for ( var i = 0, c = values.length; i < c; ++i ) {
          if ( values[i] === scale ) {
            index = i;
            break;
          }
        }

        if ( index === null ) {
          return NaN;
        }
      }

      base = index - 8;

      return size.div(Math.pow(multi, base*-1));
    }
  };
}

if ( typeof module !== 'undefined' && module.exports ) {
  var BigNumber = require('bignumber.js');
  module.exports = siUnit(BigNumber);
} else if ( typeof define == 'function' && define.amd ) {
  define(['bignumber'], function(BigNumber) {
    return siUnit(BigNumber);
  });
} else {
  global.siUnit = siUnit(global.BigNumber);
}

})(this);
