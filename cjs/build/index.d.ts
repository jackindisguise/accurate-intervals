/// <reference types="node" />
/** Tracks active intervals and updates timeout IDs so they can be cancelled. */
export declare const intervals: {
    [key: number]: NodeJS.Timeout;
};
/**
 * Sets an interval that fires at the given interval without respect to when it was fired.
 * @param callback A callback that is fired on the interval.
 * @param interval The interval to fire the callback at.
 * @returns {number} An ID that tracks this interval.
 */
export declare function setAbsoluteInterval(callback: (delay: number) => void, interval: number): number;
/**
 * Sets an interval that fires at the given interval with respect to when it was fired.
 * @param callback A callback that is fired on the interval.
 * @param interval The interval to fire the callback at.
 * @returns {number} An ID that tracks this interval.
 */
export declare function setRelativeInterval(callback: (delay: number) => void, interval: number): number;
/**
 * Clears accurate or relative intervals.
 * @param ...ids A set of accurate or relative intervals to cancel.
 */
export declare function clearCustomInterval(...ids: number[]): void;
