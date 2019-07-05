# dotpather-transform

[![Build Status](https://travis-ci.org/skinnyjames/dotpather-transform.svg?branch=master)](https://travis-ci.org/skinnyjames/dotpather-transform)

tranform nested objects with dotpaths

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
