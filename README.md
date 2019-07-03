# dotpather-transform

## usage

```javascript
var dotpather = require('./index.js')
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

```
