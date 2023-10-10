# About
This package provides functionality that I often end up rewriting when working on text-based games (MUDs in particular).

The major focus of a lot of these functions is to deal with manipulating strings for interacting with things, or manipulating strings for presentational purposes.

I would ideally like to create a module for handling command processing at some point.

# Compatibility
Supports both CJS and ES6 import style.
```javascript
// CommonJS-style
const accurateIntervals = require("accurate-intervals");

// ES6 module-style
import * as accurateIntervals from "accurate-intervals";
```

# Install
`npm i accurate-intervals`

# Features
### Intervals that fire with respect to 0 milliseconds.
If `Date.now()` returns `48382382934`, setting an absolute interval that fires every `1000` milliseconds should be expected to fire at `48382383000`, `48382384000`, `48382385000`, `48382386000`, etc...
```javascript
accurateIntervals.setAbsoluteInterval((delay)=>{
	console.log(`firing after ${delay} milliseconds...`)
}, 1000)
```

The first time the interval fires, the delay can vary wildly.
* If you set it at `999999999`, it will want to fire after `1` millisecond (and probably will fail).
* If you set it at `111111111`, it will want to fire after `889` milliseconds.
### Intervals that fire with respect to when they were set.
If `Date.now()` returns `48382382934`, setting an absolute interval that fires every `1000` milliseconds should be expected to fire at `48382383934`, `48382384934`, `48382385934`, `48382386934`, etc...
```javascript
accurateIntervals.setRelativeInterval((delay)=>{
	console.log(`firing after ${delay} milliseconds...`)
}, 1000)
```

Due to inherent unpredictability in the way intervals and timeouts work, you can expect `delay` to always be between `0` and `1000` in these examples.

Setting an interval below 50ms is inadvisable in pretty much all circumstances. Due to the unpredictable variations in delays, you will create a runaway condition where the interval can never catch up and fires endlessly.