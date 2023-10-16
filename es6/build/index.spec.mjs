import { expect } from "chai";
import * as time from "./index.mjs";
describe("setAbsoluteInterval", () => {
    const timeout = 10000;
    it("predictable execution time", (done) => {
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
        }, timeout * 0.9);
    }).timeout(timeout);
});
describe("setRelativeInterval", () => {
    const timeout = 10000;
    it("predictable execution time", (done) => {
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
        }, timeout * 0.9);
    }).timeout(timeout);
});
