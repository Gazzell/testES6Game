import { expect } from 'chai';

describe("sum", () => {
    context("when both arguments are valid numbers", () => {
        it("adds the numbers together", () => {
            expect(1+2).to.equal(3);
        });
    });
});