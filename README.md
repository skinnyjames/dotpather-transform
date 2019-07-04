# dotpather-transform

[![Build Status](https://travis-ci.org/skinnyjames/dotpather-transform.svg?branch=master)](https://travis-ci.org/skinnyjames/dotpather-transform)

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

You can also refer to array indexes

```javascript

var transform = dotpather('one.two.three.1.five.1')
var data = {
  one: { 
    two: {
      three: [4, { five: [ 6, 7 ] }]
    }
  }
}

let obj = transform(data, function(number) {
  return number + 1;
})

// { one: { two: { three: [4, { five: [ 6, 8 ] } ] } } }

```

## numeric object keys

There is no way for this module to tell whether numbers in your dotpath refer to an array index or an object key.

If you are pathing numeric object keys, be sure to append :key to your numerical path

```javascript

var transform = dotpather('one.2:key')
var data = { one: { '2': 3 } }

var transformed = transform(data, function(number) {
  return number + 1
})

// { one: { '2': 4 } }

```

this module uses [deep merge](https://github.com/TehShrike/deepmerge) to merge the transformed object with the original one.

you can pass custom merge options as the third parameter to the transform function
