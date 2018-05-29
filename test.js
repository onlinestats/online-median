var Median = require('./index')
var test = require('tape')

test('Simple test with NaN and Strings', (_) => {
  var median = Median()
  ;[5, 'Hello', 15, '1', 3, 2, 8, 7, 9, 10, 6, 11, 4].forEach(v => {
    median(v)
  })
  _.equal(median(), 6.5)
  _.end()
})

test('Only one value', (_) => {
  var median = Median()
  median(5)
  _.equal(median(), 5)
  _.end()
})
