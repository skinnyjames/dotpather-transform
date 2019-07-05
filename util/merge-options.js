const merge = require('deepmerge')

module.exports = function(opts) {
  return {
    arrayMerge: function(destinationArray, sourceArray, options) {
      var newArray = []
      var compareArray = opts.useSourceArray ? sourceArray : destinationArray
      for (var i = 0; i < compareArray.length; i++ ) {
        if (options.isMergeableObject(compareArray[i])) {
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
}
