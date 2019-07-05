
module.exports = dotpather

function dotpather (str, opts = { strict: false }) {
  var parts = str.split('.')
  return function transform (data, cb) {
    return set(parts, data, cb)

    function set (parts, data, cb) {
      var part = parts.shift()
      if (!data[part]) {
        if (opts.strict) {
          throw new Error('cannot find path ' + str)
        } else {
          return data
        }
      }
      if (parts.length === 0) {
        data[part] = cb(data[part])
        return data
      } else {
        data[part] = set(parts, data[part], cb)
        return data
      }
    }
  }
}
