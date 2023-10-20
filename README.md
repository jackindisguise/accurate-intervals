[![npm](https://img.shields.io/npm/v/accurate-intervals)](https://www.npmjs.com/package/accurate-intervals)
[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/jackindisguise/accurate-intervals/main)](https://github.com/jackindisguise/accurate-intervals)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/jackindisguise/accurate-intervals/main)

[![Static Badge](https://img.shields.io/badge/documentation-orange)](https://jackindisguise.github.io/accurate-intervals/)

# About
Provides functions for setting intervals that correct themselves in different ways.

# Compatibility
Supports both CJS and ES6 import style.
```javascript
// CommonJS-style
const {setAbsoluteInterval, setRelativeInterval, clearCustomInterval} = require("accurate-intervals");

// ES6 module-style
import {setAbsoluteInterval, setRelativeInterval, clearCustomInterval} from "accurate-intervals";
```

# Install
`npm i accurate-intervals`

# Features

### Intervals that fire with respect to 0 milliseconds.
```javascript
setAbsoluteInterval((delay)=>{
	console.log(`(${Date.now()}: Fired after ${delay} milliseconds.`);
}, 1000)
```
If `Date.now()` returns `123###`, setting an absolute interval that fires every `1000` milliseconds should be expected to fire at `124000`, `125000`, `126000`, `127000`, etc...

The first time the interval fires, the delay can vary wildly.
* If you set it at `999999`, it will want to fire after `1` millisecond.
* If you set it at `111111`, it will want to fire after `889` milliseconds.

### Intervals that fire with respect to when they were set.
```javascript
setRelativeInterval((delay)=>{
	console.log(`(${Date.now()}: Fired after ${delay} milliseconds.`);
}, 1000)
```
If `Date.now()` returns `123###`, setting a relative interval that fires every `1000` milliseconds should be expected to fire at `124###`, `125###`, `126###`, `127###`, etc...

Due to inherent unpredictability in the way intervals and timeouts work, the time between firing will vary, but it will always be between `0ms`\~`1000`ms (in this example). In my experience, you can expect it to vary by `0ms`\~`25ms` on average regardless of the actual interval assigned, with some spikes of `100ms`\~ or more uncommonly.

### Cycle skipping.
Setting an interval below `30ms` is inadvisable in pretty much all circumstances, as you may create a runaway condition where your interval will have to endlessly try to catch up. In order to avoid this scenario, these interval functions automatically skip cycles that are trying to catch up.

### Canceling intervals.
```javascript
const intervalID = setRelativeInterval((delay)=>{
	clearCustomInterval(intervalID);
	console.log("only fires once");
}, 1000);
```
`clearCustomInterval` clears intervals set by both `setRelativeInterval` and `setAbsoluteInterval`.