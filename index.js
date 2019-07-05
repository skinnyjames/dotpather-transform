const dotpather = require('dotpather')
const merge = require('deepmerge')
const options = require('./util/merge-options')

module.exports = transform

function transform (str, dotpathOptions) {
  var lookup = dotpather(str.replace(/:key/g, ''))
  var parts = str.split('.').reverse()
  var len = parts.length

  return function (obj, cb, mergeOptions) {
    var value = lookup(obj)
    var testKey
    var isKey
    var construct
    var sourceArrayLength = 0
    var destArrayLength = 0
    var keyArr
    var opts = mergeOptions || options

    if (!value) {
      if (!dotpathOptions.strict) {
        return obj
      } else {
        throw new Error('Cannot find prop at dotpath ' + str)
      }
    }

    if (value instanceof Array) {
      destArrayLength = value.length
      value = cb(value)
      sourceArrayLength = value.length
      if (sourceArrayLength !== destArrayLength) {
        value.unshift('DOTPATHER_TRANSFORM_USE_SOURCE_ARRAY')
      }
    } else {
      value = cb(value)
    }

    for (var i = 0; i < len; i++) {
      keyArr = parts[i].split(':')
      testKey = keyArr[0]
      isKey = keyArr[1]

      var temp = (parseInt(testKey) && !isKey) ? [] : {}

      if (i === 0) {
        construct = (parseInt(testKey) && !isKey) ? [] : {}
        construct[testKey] = value
      } else {
        temp[testKey] = construct
        construct = temp
      }
    }
    return merge(obj, construct, opts)
  }
}
