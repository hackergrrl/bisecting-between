var bnum = require('bisecting-numbers')()

function between (lo, hi) {
  // base case
  if (lo === between.lo && hi === between.hi) {
    return bnum.zero()
  }

  // right and left edges
  if (hi === between.hi) {
    return bnum.inc(lo)
  }
  if (lo === between.lo) {
    return bnum.dec(lo)
  }

  // invariant
  if (bnum.compare(lo, hi) >= 0) {
    throw new Error(lo + ' is larger than ' + hi)
  }

  // there is space in between lo and hi
  var loInc = bnum.inc(lo)
  if (bnum.compare(loInc, hi) === -1) {
    return loInc
  }

  var lolen = lo.split('.').length
  var hilen = hi.split('.').length

  // no space between lo and hi ==> BRANCH!
  if (lolen === hilen) {
    return bnum.bisect(lo)
  }

  // hi is in a higher bisection space than lo, so decrement hi in its own bisection space
  if (lolen < hilen) {
    return bnum.dec(hi)
  }
}

between.lo = 0
between.hi = 1

module.exports = between
