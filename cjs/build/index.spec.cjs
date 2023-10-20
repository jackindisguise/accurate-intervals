(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chai", "./index.cjs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chai_1 = require("chai");
    const time = require("./index.cjs");
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
            (0, chai_1.expect)(diff / cycle).is.lessThanOrEqual(30); // diff is within 30ms
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
            (0, chai_1.expect)(diff / cycle).is.lessThanOrEqual(30); // diff is within 30ms
            done();
        }, timeout * 0.95);
    }).timeout(timeout);
});
