(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clearCustomInterval = exports.setRelativeInterval = exports.setAbsoluteInterval = exports.intervals = void 0;
    /** Tracks active intervals and updates timeout IDs so they can be cancelled. */
    exports.intervals = {};
    /** Tracks the next interval ID for this session. */
    let nextIntervalID = 0;
    /**
     * Sets an interval that fires at the given interval without respect to when it was fired.
     * @param callback A callback that is fired on the interval.
     * @param interval The interval to fire the callback at.
     * @returns {number} An ID that tracks this interval.
     */
    function setAbsoluteInterval(callback, interval) {
        const intervalID = nextIntervalID++;
        const startTime = Math.floor(Date.now() / interval) * interval;
        let cycle = 1; // number of cycles we've been through
        const __next = () => {
            const now = Date.now();
            const target = startTime + interval * cycle++; // calculate the target from the start point
            const remainder = target - now;
            exports.intervals[intervalID] = setTimeout(() => {
                __next();
                callback(remainder);
            }, remainder);
        };
        __next();
        return intervalID;
    }
    exports.setAbsoluteInterval = setAbsoluteInterval;
    /**
     * Sets an interval that fires at the given interval with respect to when it was fired.
     * @param callback A callback that is fired on the interval.
     * @param interval The interval to fire the callback at.
     * @returns {number} An ID that tracks this interval.
     */
    function setRelativeInterval(callback, interval) {
        const intervalID = nextIntervalID++;
        const startTime = Date.now();
        let cycle = 1; // number of cycles we've been through
        const __next = () => {
            const now = Date.now();
            const target = startTime + interval * cycle++; // calculate the target from the start point
            const remainder = target - now;
            exports.intervals[intervalID] = setTimeout(() => {
                __next();
                callback(remainder);
            }, remainder);
        };
        __next();
        return intervalID;
    }
    exports.setRelativeInterval = setRelativeInterval;
    /**
     * Clears accurate or relative intervals.
     * @param ...ids A set of accurate or relative intervals to cancel.
     */
    function clearCustomInterval(...ids) {
        for (const id of ids) {
            if (!(id in exports.intervals))
                continue;
            const timeoutID = exports.intervals[id];
            delete exports.intervals[id];
            clearTimeout(timeoutID);
        }
    }
    exports.clearCustomInterval = clearCustomInterval;
});
