const dotpather = require('dotpather')
const merge = require('deepmerge')
const options = require('./util/merge-options')

module.exports = transform

function transform (str, dotpathOptions) {
  var lookup = dotpather(str.replace(/:key/g, ''))
  var parts = str.split('.').reverse()
  var len = parts.length

  return function (obj, cb, mergeOptions) {
    var originalValue = lookup(obj)
    var value
    var testKey
    var isKey
    var construct
    var keyArr
    var opts = mergeOptions || options

    if (!originalValue) {
      if (!dotpathOptions.strict) {
        return obj
      } else {
        throw new Error('Cannot find prop at dotpath ' + str)
      }
    }

    if (originalValue instanceof Array) {
      value = cb(originalValue)
      if ((value instanceof Array) && value.length !== originalValue.length) {
        value.unshift('DOTPATHER_TRANSFORM_USE_SOURCE_ARRAY')
      }
    } else {
      value = cb(originalValue)
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
