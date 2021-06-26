import deepCompare from "./deepCompare";

type Version = {
  version: Symbol;
};

type ObjectVersion = {
  __version__: Symbol;
  __version___: Version;
  [k: string]: any;
};

function objectVersion(some: Object): object;
function objectVersion(some: Object, version: Version): object;
function objectVersion(some: Object, old?: ObjectVersion): object;
function objectVersion(some: Object, version?: Version | ObjectVersion) {
  let _version: Version;
  if (!version) {
    _version = {
      version: Symbol("version"),
    };
  } else {
    const versionKeys = Object.keys(version);
    if (
      versionKeys &&
      versionKeys.length === 1 &&
      versionKeys[0] === "version"
    ) {
      _version = version as Version;
    } else if (deepCompare(some, version)) {
      _version = {
        version: (version as ObjectVersion).__version___.version,
      };
    }
  }
  const _some = new Proxy(some, {
    set: (target: Object, key, value, receiver) => {
      (target as ObjectVersion).__version___.version = Symbol("version");
      return Reflect.set(target, key, value, receiver);
    },
    get: (target, key, receiver) => {
      if (key === "__version__") {
        return Reflect.get(target, "__version___").version;
      }
      const value = Reflect.get(target, key, receiver);
      if (
        Object.prototype.toString.call(value) === "[object Object]" ||
        Object.prototype.toString.call(value) === "[object Array]"
      ) {
        return objectVersion(value, (target as ObjectVersion).__version___);
      }
      return value;
    },
  });
  Reflect.defineProperty(_some, "__version___", {
    value: _version!,
    configurable: true,
    enumerable: false,
  });
  return _some as ObjectVersion;
}

// function objectVersion(
//   some: Object,
//   version: Version | undefined,
//   old: Object | undefined
// ) {}

// const objectVersion: (some: Object, version?: Version) => ObjectVersion = (
//   some,
//   version?
// ) => {
//   if (!version) {
//     version = {
//       version: Symbol("version"),
//     };
//   }
//   const _some = new Proxy(some, {
//     set: (target: Object, key, value, receiver) => {
//       (target as ObjectVersion).__version___.version = Symbol("version");
//       return Reflect.set(target, key, value, receiver);
//     },
//     get: (target, key, receiver) => {
//       if (key === "version") {
//         return Reflect.get(target, "__version___").version;
//       }
//       const value = Reflect.get(target, key, receiver);
//       if (
//         Object.prototype.toString.call(value) === "[object Object]" ||
//         Object.prototype.toString.call(value) === "[object Array]"
//       ) {
//         return objectVersion(value, (target as ObjectVersion).__version___);
//       }
//       return value;
//     },
//   });
//   Reflect.defineProperty(_some, "__version___", {
//     value: version,
//     configurable: true,
//     enumerable: false,
//   });
//   return _some as ObjectVersion;
// };

export default objectVersion;

export { deepCompare };
