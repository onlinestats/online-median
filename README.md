# online-median
Heap-based online algorithm for median calculation.
To find median in unsorted stream of data, two heaps are created.
Max-heap stores values less then M, min-heap - more than M.
Each time new input value arrives, the algorithm rebalances heaps if needed and then adds value to one of them.

If you have a really large data stream, it'd be better to use a probabilistic lossy algorithm.

## Installation
```
npm i -S online-median
```

## Usage
```
const Median = require('online-median')
const median = Median()

;[1,2,3,4,5,6].forEach(v => median(v))

console.log(median()) // -> 3.5
```
