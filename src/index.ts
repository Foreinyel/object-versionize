import deepCompare from "./deepCompare";

type Version = {
  version: Symbol;
};

export type ObjectVersion<T> = {
  [K in keyof T]: T[K];
  // __version__: Symbol;
  // __version___: Version;
} & {
  __version__: Symbol;
  __version___: Version;
};

function objectVersion<T extends object>(some: T): ObjectVersion<T>;
function objectVersion<T extends object>(
  some: T,
  version: Version
): ObjectVersion<T>;
function objectVersion<T extends object>(
  some: T,
  old?: ObjectVersion<T>
): ObjectVersion<T>;
function objectVersion<T extends object>(
  some: T,
  version?: Version | ObjectVersion<T>
) {
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
        version: (version as ObjectVersion<T>).__version___.version,
      };
    }
  }
  const _some = new Proxy(some, {
    set: (target: T, key, value, receiver) => {
      (target as ObjectVersion<T>).__version___.version = Symbol("version");
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
        return objectVersion(value, (target as ObjectVersion<T>).__version___);
      }
      return value;
    },
  });
  Reflect.defineProperty(_some, "__version___", {
    value: _version!,
    configurable: true,
    enumerable: false,
  });
  return _some as ObjectVersion<T>;
}

export default objectVersion;

export { deepCompare };
