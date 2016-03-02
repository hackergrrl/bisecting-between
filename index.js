var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function between(lo, hi) {
  // base case
  if (lo === between.lo && hi === between.hi) {
    return 'A'
  }

  // right and left edges
  if (hi === between.hi) {
    return increment(lo)
  }
  if (lo === between.lo) {
    return decrement(hi)
  }

  // why do we even *HAVE* invariants
  if (!greaterThan(hi, lo)) {
    throw new Error(lo + ' is larger than ' + hi)
  }

  // same prefix
  if (prefix(lo) === prefix(hi)) {
    // there is space in between lo and hi
    if (increment(lo) !== hi) {
      return increment(lo) 
    }

    // no space between lo and hi ==> EXTEND PREFIX!
    return lo + '.A'
  }

  // need to diverge to make room between lo and hi
  if (greaterThan(increment(lo), hi)) {
    throw new Error('not impl')
  }
}

// true iff a > b
function greaterThan (a, b) {
  for (var i = 0; i < Math.min(a.length, b.length); i++) {
    var al = a.charAt(i)
    var bl = b.charAt(i)
  }
}

function increment (v) {

  function incrementChar (c) {
    var idx = chars.indexOf(c)
    if (idx >= chars.length - 1) {
      return 'A'
    } else {
      return chars[chars.indexOf(c) + 1]
    }
  }

  if (v.indexOf('.') !== -1) {
    return prefix(v) + increment(suffix(v))
  }

  var result = ''
  for (var i = v.length - 1; i >= 0; i--) {
    var next = incrementChar(v[i])
    result = next + result
    if (next !== 'A') {
      return v.substring(0, i) + result
    } else if (i === 0) {
      result = result + 'A'
    }
  }
  return result
}
//------------------
var a = between(between.lo, between.hi)
console.log(a)
for (var i = 0; i < 10; i++) {
  a = increment(a)
  console.log(a)
}

var b = between('A', 'B')
console.log(b)
for (var i = 0; i < 10; i++) {
  b = increment(b)
  console.log(b)
}

console.log(between('E.C', 'F'))

console.log(between('E', 'F.A'))
//------------------

function decrement (v) {
  // TODO oooooooooooooooooooooooooooooooooooooooooooooooooooooooo
}

function depth (v) {
  var count = 0
  for (var i=0; i < v.length; i++) {
    if (v.charAt(i) === '.') {
      count++
    }
  }
  return count
}

function prefix (v) {
  if (v.indexOf('.') === -1) {
    return ''
  } else {
    return v.substring(0, v.lastIndexOf('.') + 1)
  }
}

function suffix (v) {
  if (v.indexOf('.') === -1) {
    return v
  } else {
    return v.substring(v.lastIndexOf('.') + 1)
  }
}

between.lo = 0
between.hi = 1

module.exports = between


/*
 
A
B
C
D
E
E.A
E.B
E...A
E...B
E...C
E..A
E..B
E..B.A
E..B.B
E..B.C
E..C
E.B.A
E.B.B
E.B.C
E.C
F
G
AA
AB
AC
AAA
AAB
AAC


*/
