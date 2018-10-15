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
  var value = 0
  var n = 0

  // Right, Min heap
  var rHeap = new Heap(function (a, b) {
    return a - b
  })

  // Left, Max heap
  var lHeap = new Heap(function (a, b) {
    return b - a
  })

  var median = function median (x) {
    if (!isNaN(x)) {
      if (typeof x !== 'number') {
        x = parseFloat(x)
      }
      n += 1
      var sig = signum(lHeap.size(), rHeap.size())
      switch (sig) {
        // Left heap size > Right heap
        case 1:
          if (x < value) {
            // Target: left heap
            rHeap.push(lHeap.pop())
            lHeap.push(x)
          } else {
            // Target: right heap
            rHeap.push(x)
          }
          // Heaps are balanced
          value = average(lHeap.top(), rHeap.top())
          break
        // Same number of elements
        case 0:
          if (x < value) {
            // Target: left heap
            lHeap.push(x)
            // Left heap is bigger now. Middle-point is top of the left heap
            value = lHeap.top()
          } else {
            // Target: right heap
            rHeap.push(x)
            value = rHeap.top()
          }
          break
        // Left heap size < Right heap
        case -1:
          if (x < value) {
            // Target: left heap
            lHeap.push(x)
          } else {
            lHeap.push(rHeap.pop())
            rHeap.push(x)
          }
          // Heaps are balanced
          value = average(lHeap.top(), rHeap.top())
          break
      } // *switch
    } else if (Array.isArray(x)) {
      x.forEach(el => median(el))
    }
    return value
  }

  median.fit = function (x) {
    median(x)
  }

  Object.defineProperty(median, 'value', {
    get: function () {
      return value
    }
  })

  Object.defineProperty(median, 'n', {
    get: function () {
      return n
    }
  })

  return median
}
