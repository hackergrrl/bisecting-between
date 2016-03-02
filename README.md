# bisecting-between

> Produces a unique value that sorts between two other given values.

## background

This module makes it easy to select a unique value between any two bisecting
numbers, where there are always unique values between any two such numbers. Read
more about [bisecting numbers
here](https://github.com/noffle/bisecting-numbers).

This module is inspired by Dominic Tarr's
[between](https://github.com/dominictarr/between) module. This module aims to
offer an equivalent API with the same key property of being commutative (i.e.
inserting between two items does not change the positions of nodes later in a
created list).

`between` is great, but the length of the identifier in the case of consecutive appends
and prepends is very expensive, growing linearly:

```js
var n = between(between.lo, between.hi)
for (var i=0; i < 100; i++) {
  if (i % 10 === 0) {
    console.log(n)
  }
  n = between(n, between.hi)
}
```

```
V
zy
zzzs
zzzzzV
zzzzzzy
zzzzzzzzs
zzzzzzzzzzV
zzzzzzzzzzzy
zzzzzzzzzzzzzs
zzzzzzzzzzzzzzzV
```

`bisecting-between` optimizes for minimizing the growth of string
length in the append and prepend cases, growing logarithmically:

```
0
A
K
U
e
o
y
18
1I
1S
```

This trade-off makes random insertions more growth expensive instead. In
certain applications (like text editors), long appends and prepends are far more
common.

## example

```js
> var between = require('bisecting-between')()

> between()
'0'

> between('A', 'B')
'A.0'

> between('A.0', between.hi)
A.1

> between('E.C', 'F')
'E.D'
```

## api

### var between = BisectingBetween(alphabet)

Returns a function (that generates values between two other values) across the
given string `alphabet` (where `alphabet.charAt(0)` is the zero value, the next
is 1, etc). If not provided, the alphabet is the string
`'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'`.

### between(lo, hi)

Returns a [bisecting number](https://github.com/noffle/bisecting-numbers) that
is between two other bisecting numbers that will always sort as between `lo` and
`hi`.

### between.lo, between.hi

Fixed values that symbolize the absolute lowest and highest, respectively.

## install

With [npm](https://npmjs.org/) installed, run

```
$ npm install bisecting-between
```

## license

ISC
