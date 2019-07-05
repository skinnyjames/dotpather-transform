var test = require('tape')
var dotpather = require('../index.js')

test('mutates value at property', function (t) {
  t.plan(1)

  var transform = dotpather('one')
  var value = transform({ one: 1 }, function (num) {
    return num + 1
  })

  t.equal(value.one, 2)
})

test('mutates nested values', function (t) {
  t.plan(1)

  var transform = dotpather('one.two.three')
  var value = transform({ one: { two: { three: 3 } } }, function (num) {
    return num + 1
  })

  t.equal(value.one.two.three, 4)
})

test('will not mutate object if path not found', function (t) {
  t.plan(1)

  var transform = dotpather('one.two.four', { strict: false })
  var value = transform({ one: { two: { three: 3 } } }, function (num) {
    return num + 1
  })

  t.deepEqual(value, { one: { two: { three: 3 } } })
})

test('works with mixed types', function (t) {
  t.plan(1)

  var transform = dotpather('one.1.two.1.three')
  var data = { one: [ 0, { two: [ 0, { three: 3 } ] } ] }

  var value = transform(data, function (num) {
    return num + 1
  })

  t.equal(value.one[1].two[1].three, 4)
})

test('works with filter', function (t) {
  t.plan(1)

  var transform = dotpather('one.two')
  var data = { one: { two: [ { name: 'bad', value: 'test' }, { name: 'good', value: 'test' } ] } }
  var value = transform(data, function (values) {
    return values.filter(function (value) {
      return value.name !== 'bad'
    })
  })

  t.deepEqual(value.one.two, [ { name: 'good', value: 'test' } ])
})

test('works with nested filter', function (t) {
  t.plan(1)

  var transform = dotpather('one.1.two')
  var data = { one: [ 0, { two: [ { name: 'bad', value: 'test' }, { name: 'good', value: 'test' } ] }, 3 ] }

  var value = transform(data, function (values) {
    return values.filter(function (value) {
      return value.name !== 'bad'
    })
  })

  t.deepEqual(value.one, [ 0, { two: [ { name: 'good', value: 'test' } ] }, 3 ])
})

test('use numeric object keys', function (t) {
  t.plan(1)

  var transform = dotpather('one.1:key.2:key')
  var data = { one: { '1': { '2': 3 } } }
  var value = transform(data, function (number) {
    return number + 1
  })

  t.equal(value.one['1']['2'], 4)
})

test('deletions', function (t) {
  t.plan(1)

  var transform = dotpather('one')
  var data = { one: { two: 3, three: 4 } }
  var value = transform(data, function (obj) {
    delete obj.two
    return obj
  })

  t.deepEqual(value.one, { three: 4 })
})

test('array middles', function (t) {
  t.plan(1)

  var transform = dotpather('one.1')
  var data = { one: [ 1, 2, 3 ] }
  var value = transform(data, function (number) {
    return number + 1
  })

  t.deepEqual(value.one, [ 1, 3, 3 ])
})
