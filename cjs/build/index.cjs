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
    exports.clearCustomInterval = exports.setRelativeInterval = exports.setAbsoluteInterval = void 0;
    /** Tracks active intervals and updates timeout IDs so they can be cancelled. */
    const intervals = {};
    /** Tracks the next interval ID for this session. */
    let nextIntervalID = 0;
    /**
     * Sets an interval that fires at the given interval without respect to when it was fired.
     * @param callback {function} A callback that is fired on the interval.
     * @param interval {number} The interval to fire the callback at.
     * @returns {number} An ID that tracks this interval.
     */
    function setAbsoluteInterval(callback, interval) {
        const intervalID = nextIntervalID++;
        const startTime = Math.floor(Date.now() / interval) * interval;
        let cycle = 0; // number of cycles we've been through
        const __next = () => {
            let target;
            do
                target = startTime + interval * ++cycle;
            while (target < Date.now());
            const remainder = target - Date.now();
            intervals[intervalID] = setTimeout(() => {
                __next();
                callback();
            }, remainder);
        };
        __next();
        return intervalID;
    }
    exports.setAbsoluteInterval = setAbsoluteInterval;
    /**
     * Sets an interval that fires at the given interval with respect to when it was fired.
     * @param callback {function} A callback that is fired on the interval.
     * @param interval {number} The interval to fire the callback at.
     * @returns {number} An ID that tracks this interval.
     */
    function setRelativeInterval(callback, interval) {
        const intervalID = nextIntervalID++;
        const startTime = Date.now();
        let cycle = 0; // number of cycles we've been through
        const __next = () => {
            let target;
            do
                target = startTime + interval * cycle++;
            while (target < Date.now());
            const now = Date.now();
            const remainder = target - now;
            intervals[intervalID] = setTimeout(() => {
                __next();
                callback();
            }, remainder);
        };
        __next();
        return intervalID;
    }
    exports.setRelativeInterval = setRelativeInterval;
    /**
     * Clears accurate or relative intervals.
     * @param ...ids {number[]} A set of accurate or relative intervals to cancel.
     */
    function clearCustomInterval(...ids) {
        for (const id of ids) {
            if (!(id in intervals))
                continue;
            const timeoutID = intervals[id];
            delete intervals[id];
            clearTimeout(timeoutID);
        }
    }
    exports.clearCustomInterval = clearCustomInterval;
});
