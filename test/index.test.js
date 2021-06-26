const { expect, test } = require("@jest/globals");
const objectVersion = require("../lib/index.cjs").default;

// const testObject = {
//   prop1: 1,
//   prop2: "a",
//   prop3: {
//     prop31: "31",
//   },
//   prop4: [
//     41,
//     42,
//     42,
//     {
//       prop43: "vvv",
//     },
//   ],
// };
// const versionized = objectVersion(testObject);

describe("objectVersion", () => {
  test("type of the version of initialized version object is symbol", () => {
    const testObject = {
      prop1: 1,
    };
    const versionized = objectVersion(testObject);
    expect(typeof versionized.__version__ === "symbol").toBeTruthy();
  });

  test("change value of shallowed property, version would change", () => {
    const testObject = {
      prop1: 1,
    };
    const versionized = objectVersion(testObject);
    const version1 = versionized.__version__;
    versionized.prop1 = 2;
    expect(versionized.__version__).not.toEqual(version1);
    expect(testObject.prop1).toEqual(2);
    expect(versionized.prop1).toEqual(2);
  });

  test("change value of shallowed object, version would change", () => {
    const testObject = {
      prop3: {
        prop31: "31",
      },
    };
    const versionized = objectVersion(testObject);
    const version1 = versionized.__version__;
    versionized.prop3.prop31 = 32;
    expect(versionized.__version__).not.toEqual(version1);
    expect(testObject.prop3.prop31).toEqual(32);
    expect(versionized.prop3.prop31).toEqual(32);
  });

  test("change array value of shallowed object, version would change", () => {
    const testObject = {
      prop4: [
        41,
        42,
        42,
        {
          prop43: "vvv",
        },
      ],
    };
    const versionized = objectVersion(testObject);
    const version1 = versionized.__version__;
    versionized.prop4.push(100);
    expect(versionized.__version__).not.toEqual(version1);
    expect(testObject.prop4.length).toEqual(5);
    expect(versionized.prop4[4]).toEqual(100);

    const version2 = versionized.__version__;
    versionized.prop4[3].prop43 = "vvvvv";
    expect(versionized.__version__).not.toEqual(version2);
    expect(testObject.prop4[3].prop43).toEqual("vvvvv");
    expect(versionized.prop4[3].prop43).toEqual("vvvvv");
  });

  test("two deep equal objects should have the same version", () => {
    const testObject1 = {
      prop3: {
        prop31: "31",
      },
    };
    const testObject2 = {
      prop3: {
        prop31: "31",
      },
    };
    const versionized1 = objectVersion(testObject1);
    const versionized2 = objectVersion(testObject2, versionized1);
    expect(versionized1.__version__ === versionized2.__version__).toBeTruthy();
  });
});
