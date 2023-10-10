# About
This package provides functionality for setting intervals that correct themselves in different ways.

# Compatibility
Supports both CJS and ES6 import style.
```javascript
// CommonJS-style
const {setAbsoluteInterval, setRelativeInterval} = require("accurate-intervals");
```
```javascript
// ES6 module-style
import {setAbsoluteInterval, setRelativeInterval} from "accurate-intervals";
```

# Install
`npm i accurate-intervals`

# Features
### Intervals that fire with respect to 0 milliseconds.
If `Date.now()` returns `123456`, setting an absolute interval that fires every `1000` milliseconds should be expected to fire at `124000`, `125000`, `126000`, `127000`, etc...
```javascript
setAbsoluteInterval((delay)=>{
	console.log(Date.now(), `firing after ${delay} milliseconds...`)
}, 1000)
```

The first time the interval fires, the delay can vary wildly.
* If you set it at `999999`, it will want to fire after `1` millisecond.
* If you set it at `111111`, it will want to fire after `889` milliseconds.
### Intervals that fire with respect to when they were set.
If `Date.now()` returns `123456`, setting an absolute interval that fires every `1000` milliseconds should be expected to fire at `124456`, `125456`, `126456`, `127456`, etc...
```javascript
setRelativeInterval((delay)=>{
	console.log(Date.now(), `firing after ${delay} milliseconds...`)
}, 1000)
```

Due to inherent unpredictability in the way intervals and timeouts work, `delay` will vary, but it will always be between `0ms` and `1000`ms. In my experience, you can expect it to vary by `0ms`~`25ms` on average regardless of the actual interval assigned, with some spikes of `100ms`~ or more uncommonly.

Setting an interval below `30ms` is inadvisable in pretty much all circumstances for this reason, as you may create a runaway condition where your interval will have to endlessly try to catch up.
### Canceling intervals.
```javascript
const {setRelativeInterval, clearCustomInterval} = require("accurate-intervals");
const intervalID = setRelativeInterval((delay)=>{
	clearCustomInterval(intervalID);
	console.log("only fires once");
}, 1000);
```
`clearCustomInterval` clears intervals set by both `setRelativeInterval` and `setAbsoluteInterval`.