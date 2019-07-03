var dotpather = require('./index.js')
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

console.log(obj)
console.log(obj.one.two.three)

