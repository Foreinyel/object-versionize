const { deepCompare } = require("../lib/index.cjs");

describe("deepCompare", () => {
  test("two equal objects", () => {
    const objectA = {
      p1: 1,
      p2: [3],
      p3: {
        p31: 3,
      },
    };
    const objectB = {
      p1: 1,
      p2: [3],
      p3: {
        p31: 3,
      },
    };
    expect(deepCompare(objectA, objectB)).toBeTruthy();
  });
  test("two un-equal objects", () => {
    const objectA = {
      p1: 1,
      p2: [3],
      p3: {
        p31: 3,
      },
    };
    const objectB = {
      p1: 1,
      p2: [3],
      p3: {
        p31: 4,
      },
    };
    expect(deepCompare(objectA, objectB)).not.toBeTruthy();
  });
});
