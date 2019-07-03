const dotpather = require('dotpather')
const merge = require('deepmerge')

module.exports = transform

function transform (str) { 
  var lookup = dotpather(str)
  var parts = str.split('.').reverse()
  var len = parts.length
 
  return function(obj, cb, mergeOptions={}) {
    var value = lookup(obj)
    var testKey
    var construct = {}

    if (!value) { 
      return obj
    }
    
    value = cb(value)
   
    for (let i = 0; i < len; i++) {
      testKey = parts[i]
      if (i == 0) {
        construct[testKey] = value 
      } else {
        var temp = new Object()
        temp[testKey] = construct
        construct = temp 
      }
    }
    return merge(obj, construct, mergeOptions)
  } 
}
