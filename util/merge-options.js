const merge = require('deepmerge')

module.exports = {
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
