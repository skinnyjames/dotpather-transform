const dotpather = require('dotpather')
const merge = require('deepmerge')

module.exports = transform

function transform (str) { 
  var lookup = dotpather(str)
  var parts = str.split('.').reverse()
  var len = parts.length

  var mergeOptions = {
    arrayMerge: function(destinationArray, sourceArray, options) {
      var newArray = []
      for (var i = 0; i < sourceArray.length; i++ ) {
        if (options.isMergeableObject(destinationArray[i])) {
          newArray.push(merge(destinationArray[i], sourceArray[i], this))
        } else {
          if (!!sourceArray[i]) {
            newArray.push(sourceArray[i])
          } else {
            newArray.push(destinationArray[i])
          }
        }
      }
      return newArray
    }
  }
 
  return function(obj, cb) {
    var value = lookup(obj)
    var testKey
    var construct = {}

    if (!value) { 
      return obj
    }
    
    value = cb(value)
   
    for (let i = 0; i < len; i++) {
      testKey = parts[i]
      temp = parseInt(testKey) ? [] : {}

      if (i == 0) {
        construct = parseInt(testKey) ? [] : {}
        construct[testKey] = value 
      } else {
        temp[testKey] = construct
        construct = temp 
      }
    }

    return merge(obj, construct, mergeOptions)
  } 
}
