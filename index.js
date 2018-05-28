var Heap = require('heap')

function signum (a, b) {
  if (a === b) return 0
  return a < b ? -1 : 1
}

function average (a, b) {
  return (a + b) / 2
}

module.exports = function () {
  // Initial median value
  var m = 0

  // Right, Min heap
  var rHeap = new Heap(function (a, b) {
    return a - b
  })

  // Left, Max heap
  var lHeap = new Heap(function (a, b) {
    return b - a
  })

  return function (input) {
    if (!isNaN(input)) {
      var x = (typeof input === 'number') ? input : parseFloat(input)
      var sig = signum(lHeap.size(), rHeap.size())
      switch (sig) {
        // Left heap size > Right heap
        case 1:
          console.log('Case 1')
          if (x < m) {
            // Target: left heap
            rHeap.push(lHeap.pop())
            lHeap.push(x)
          } else {
            // Target: right heap
            rHeap.push(x)
          }
          // Heaps are balanced
          m = average(lHeap.top(), rHeap.top())
          break
        // Same number of elements
        case 0:
          if (x < m) {
            // Target: left heap
            lHeap.push(x)
            // Left heap is bigger now. Middle-point is top of the left heap
            m = lHeap.top()
          } else {
            // Target: right heap
            rHeap.push(x)
            m = rHeap.top()
          }
          break
        // Left heap size < Right heap
        case -1:
          if (x < m) {
            // Target: left heap
            lHeap.push(x)
          } else {
            lHeap.push(rHeap.pop())
            rHeap.push(x)
          }
          // Heaps are balanced
          m = average(lHeap.top(), rHeap.top())
          break
      } // *switch
    } // *if !NaN
    return m
  }
}
