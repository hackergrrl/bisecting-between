var test = require('tape')
var BisectingBetween = require('../index')

test('basic', function (t) {
  var between = BisectingBetween()

  t.notEquals(between(), '0')

  t.equals(between('0', between.hi), '1')

  t.equals(between('-1', '1'), '0')
  t.equals(between('-1.0', '1'), '-1.1')

  t.equals(between(between.lo, '0'), '-1')
  t.equals(between(between.lo, '-1'), '-2')

  t.equals(between('A', 'B'), 'A.0')

  t.equals(between('E.C', 'F'), 'E.D')

  t.equals(between('F', 'F.A'), 'F.9')

  t.equals(between('F', 'F.0'), 'F.-1')

  t.end()
})
