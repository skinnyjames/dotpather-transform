var dotpather = require('./index.js')
var transform = dotpather('one.two.three')

var data = {
  one: { 
    two: {
      three: 4
    }
  }
}

let obj = transform(data, function(number) {
  return number + 1;
})

console.log(obj)
