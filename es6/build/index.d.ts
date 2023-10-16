/**
 * Sets an interval that fires at the given interval without respect to when it was fired.
 * @param callback {function} A callback that is fired on the interval.
 * @param interval {number} The interval to fire the callback at.
 * @returns {number} An ID that tracks this interval.
 */
export declare function setAbsoluteInterval(callback: () => void, interval: number): number;
/**
 * Sets an interval that fires at the given interval with respect to when it was fired.
 * @param callback {function} A callback that is fired on the interval.
 * @param interval {number} The interval to fire the callback at.
 * @returns {number} An ID that tracks this interval.
 */
export declare function setRelativeInterval(callback: () => void, interval: number): number;
/**
 * Clears accurate or relative intervals.
 * @param ...ids {number[]} A set of accurate or relative intervals to cancel.
 */
export declare function clearCustomInterval(...ids: number[]): void;
