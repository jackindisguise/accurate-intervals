import { expect } from "chai";
import * as time from "./index";

const timeout = 10000;
it("setAbsoluteInterval", (done) => {
	const ms = 100;
	const start = Date.now();
	let diff = 0;
	let cycle = 0;
	const intervalID = time.setAbsoluteInterval(() => {
		cycle++;
		const now = Date.now();
		const target = Math.floor(start / ms) * ms + ms * cycle;
		diff += now - target;
	}, ms);
	setTimeout(() => {
		time.clearCustomInterval(intervalID);
		expect(diff / cycle).is.lessThanOrEqual(30); // diff is within 30ms
		done();
	}, timeout * 0.95);
}).timeout(timeout);

it("setRelativeInterval", (done) => {
	const ms = 100;
	const start = Date.now();
	let diff = 0;
	let cycle = 0;
	const intervalID = time.setRelativeInterval(() => {
		cycle++;
		const now = Date.now();
		const target = start + ms * cycle;
		diff += now - target;
	}, ms);
	setTimeout(() => {
		time.clearCustomInterval(intervalID);
		expect(diff / cycle).is.lessThanOrEqual(30); // diff is within 30ms
		done();
	}, timeout * 0.95);
}).timeout(timeout);
