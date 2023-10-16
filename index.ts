/** Tracks active intervals and updates timeout IDs so they can be cancelled. */
const intervals: { [key: number]: NodeJS.Timeout } = {};

/** Tracks the next interval ID for this session. */
let nextIntervalID: number = 0;

/**
 * Sets an interval that fires at the given interval without respect to when it was fired.
 * @param callback {function} A callback that is fired on the interval.
 * @param interval {number} The interval to fire the callback at.
 * @returns {number} An ID that tracks this interval.
 */
export function setAbsoluteInterval(
	callback: () => void,
	interval: number
): number {
	const intervalID = nextIntervalID++;
	const startTime = Math.floor(Date.now() / interval) * interval;
	let cycle = 0; // number of cycles we've been through
	const __next = () => {
		let target: number;
		do target = startTime + interval * ++cycle;
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

/**
 * Sets an interval that fires at the given interval with respect to when it was fired.
 * @param callback {function} A callback that is fired on the interval.
 * @param interval {number} The interval to fire the callback at.
 * @returns {number} An ID that tracks this interval.
 */
export function setRelativeInterval(
	callback: () => void,
	interval: number
): number {
	const intervalID = nextIntervalID++;
	const startTime = Date.now();
	let cycle = 0; // number of cycles we've been through
	const __next = () => {
		let target: number;
		do target = startTime + interval * cycle++;
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

/**
 * Clears accurate or relative intervals.
 * @param ...ids {number[]} A set of accurate or relative intervals to cancel.
 */
export function clearCustomInterval(...ids: number[]): void {
	for (const id of ids) {
		if (!(id in intervals)) continue;
		const timeoutID = intervals[id];
		delete intervals[id];
		clearTimeout(timeoutID);
	}
}
