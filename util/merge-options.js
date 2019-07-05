const merge = require('deepmerge')

module.exports = {
  arrayMerge: function(destinationArray, sourceArray, options) {
    var useSource = false
    var newArray = []
    if (sourceArray[0] == "DOTPATHER_TRANSFORM_USE_SOURCE_ARRAY") {
      var garbage = sourceArray.shift()
      var useSource = true
    } 
    var compareArray = useSource ? sourceArray : destinationArray
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
