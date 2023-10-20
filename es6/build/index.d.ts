/** Callback supplied to custom intervals. */
export type CustomIntervalCallback = (delay: number) => void;
/**
 * Sets an interval that fires at the given interval without respect to when it was fired.<br/>
 * More accurately, it fires with respect to timestamp 0.
 * @param callback A callback that is fired on the interval.
 * @param interval The interval to fire the callback at.
 * @returns An ID that tracks this interval.
 */
export declare function setAbsoluteInterval(callback: CustomIntervalCallback, interval: number): number;
/**
 * Sets an interval that fires at the given interval with respect to when it was fired.
 * @param callback A callback that is fired on the interval.
 * @param interval The interval to fire the callback at.
 * @returns An ID that tracks this interval.
 */
export declare function setRelativeInterval(callback: CustomIntervalCallback, interval: number): number;
/**
 * Clears a set of relative or absolute intervals.
 * @param ids A set of accurate or relative intervals to cancel.
 */
export declare function clearCustomInterval(...ids: number[]): void;
