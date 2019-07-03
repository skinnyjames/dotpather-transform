const dotpather = require('dotpather')
const merge = require('deepmerge')
const options = require('./util/merge-options')

module.exports = transform

function transform (str) { 
  var lookup = dotpather(str)
  var parts = str.split('.').reverse()
  var len = parts.length

 
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

    return merge(obj, construct, options)
  } 
}
