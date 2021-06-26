# object-versionize

Making a object versionized for easily checking if a object has been changed.

## installation

```console
npm install object-versionize -S

yarn add object-versionize
```

## usage

### versionize a object

```javascript
import versionize from 'object-versionize'

const a = {
  prop1: {
    b: 4
  }
}

const versionizedA = versionize(a)

const version1 = versionizedA.__version__

// set value in a, and the version of a will change
versionizedA.prop1.b = 5

// false
console.log(versionizedA.__version__ === version1);
```

### extends the version of a object if the two objects are deeply equal, otherwise, create a new versionized object

```javascript
import versionize from 'object-versionize'

const a = {
  prop1: {
    b: 4
  }
}

const b = {
  prop1: {
    b: 4
  }
}

const versionizedA = versionize(a)
const versionizedB = versionize(b, versionizedA)

const version1 = versionizedA.__version__
const version2 = versionizedB.__version__

// true
console.log(version1 === version2);
```

## use in React Hooks

Sometimes we would do some thing when a object has changed, like below:

```javascript
...
useEffect(() => {
  // do something
}, [someObject])
...
```

React won't compare deeply with the objects, sometimes, the reference of the objects aren't equal, but they are deeply equal. the `effect` should be skipped.

Some people use `JSON.stringify`, but it dosen't work when the order of the property key changed. And it cost too much time to `serialize`.

Now we can use `object-versionize` to solve the problem.

```javascript
import versionize from 'object-versionize'

// get some object from some place
const originObject = {...}
const versionizedObject = versionize(originObject)

// then set it to state
const [data, setData] = useState(versionizedObject);

// when changing the state
const newObject = {
  ...versionizedObject,
}
// passing the previous versionized object is important, if the deep value of the two objects are the same, the new version of the new object will stay the same.
const newVersionizedObject = versionize(originObject, data)
setData(newVersionizedObject)

// effect when the object changed

useEffect(() => {
  // do something
}, [data.__version__])
```
