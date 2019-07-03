var dotpather = require('./index.js')
var transform = dotpather('one.two.three.2')
var data = {
  one: { 
    two: {
      three: [4,3,2]
    }
  }
}

let obj = transform(data, function(number) {
  return number + 1;
})

console.log(obj.one.two.three)

