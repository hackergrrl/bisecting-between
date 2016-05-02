function BisectingBetween (chars) {
  if (!(this instanceof BisectingBetween)) { return new BisectingBetween(chars) }

  var bnum = require('bisecting-numbers')(chars)

  var between = function (lo, hi) {
    // base cases
    if (!lo && !hi) {
      return bnum.inc(bnum.zero())
    }
    if (lo === between.lo && hi === between.hi) {
      return bnum.inc(bnum.zero())
    }
    if (!lo) {
      lo = between.lo
    }
    if (!hi) {
      hi = between.hi
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
    if (bnum.compare(loInc, hi) === -1 && loInc !== between.lo) {
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

  between.lo = chars ? chars[0] : '0'
  between.hi = chars ? chars[chars.length - 1] : 'z'
  between.numbers = bnum

  return between
}

module.exports = BisectingBetween
