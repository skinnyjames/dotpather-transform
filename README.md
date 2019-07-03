# dotpather-transform

tranform nested objects with dotpaths
based on the [dotpather](https://github.com/jarofghosts/dotpather) module

## install

`npm i dotpather-transform`

## usage

```javascript

var dotpather = require('dotpather-transform')
var transform = dotpather('one.two.three')

var data = {
  one: { 
    two: {
      three: 4
    }
  }
}

var transformed = transform(data, function(number) {
  return number + 1;
})

// { one: { two: { three: 5 } } }

```
## merge options

this module uses [deep merge](https://github.com/TehShrike/deepmerge) to merge the transformed object with the original one.
you can pass deep merge options as an optional third parameter to the transform function 

