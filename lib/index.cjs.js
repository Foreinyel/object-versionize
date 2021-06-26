'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function deepCompare(x, y) {
  var leftChain = [];
  var rightChain = [];
  var p; // remember that NaN === NaN returns false
  // and isNaN(undefined) returns true

  if (isNaN(x) && isNaN(y) && typeof x === "number" && typeof y === "number") {
    return true;
  } // Compare primitives and functions.
  // Check if both arguments link to the same object.
  // Especially useful on the step where we compare prototypes


  if (x === y) {
    return true;
  } // Works in case when functions are created in constructor.
  // Comparing dates is a common scenario. Another built-ins?
  // We can even handle functions passed across iframes


  if (typeof x === "function" && typeof y === "function" || x instanceof Date && y instanceof Date || x instanceof RegExp && y instanceof RegExp || x instanceof String && y instanceof String || x instanceof Number && y instanceof Number) {
    return x.toString() === y.toString();
  } // At last checking prototypes as good as we can


  if (!(x instanceof Object && y instanceof Object)) {
    return false;
  }

  if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
    return false;
  }

  if (x.constructor !== y.constructor) {
    return false;
  }

  if (x.prototype !== y.prototype) {
    return false;
  } // Check for infinitive linking loops


  if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
    return false;
  } // Quick checking of one object being a subset of another.
  // todo: cache the structure of arguments[0] for performance


  for (p in y) {
    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
      return false;
    } else if (typeof y[p] !== typeof x[p]) {
      return false;
    }
  }

  for (p in x) {
    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
      return false;
    } else if (typeof y[p] !== typeof x[p]) {
      return false;
    }

    switch (typeof x[p]) {
      case "object":
      case "function":
        leftChain.push(x);
        rightChain.push(y);

        if (!deepCompare(x[p], y[p])) {
          return false;
        }

        leftChain.pop();
        rightChain.pop();
        break;

      default:
        if (x[p] !== y[p]) {
          return false;
        }

        break;
    }
  }

  return true;
}

function objectVersion(some, version) {
  var _version;

  if (!version) {
    _version = {
      version: Symbol("version")
    };
  } else {
    var versionKeys = Object.keys(version);

    if (versionKeys && versionKeys.length === 1 && versionKeys[0] === "version") {
      _version = version;
    } else if (deepCompare(some, version)) {
      _version = {
        version: version.__version___.version
      };
    }
  }

  var _some = new Proxy(some, {
    set: function set(target, key, value, receiver) {
      target.__version___.version = Symbol("version");
      return Reflect.set(target, key, value, receiver);
    },
    get: function get(target, key, receiver) {
      if (key === "__version__") {
        return Reflect.get(target, "__version___").version;
      }

      var value = Reflect.get(target, key, receiver);

      if (Object.prototype.toString.call(value) === "[object Object]" || Object.prototype.toString.call(value) === "[object Array]") {
        return objectVersion(value, target.__version___);
      }

      return value;
    }
  });

  Reflect.defineProperty(_some, "__version___", {
    value: _version,
    configurable: true,
    enumerable: false
  });
  return _some;
}

exports.deepCompare = deepCompare;
exports.default = objectVersion;
