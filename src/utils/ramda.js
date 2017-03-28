var R = require('ramda')
var C = require('../classes')

var Container = C.Container
var __map = R.map

R.map = R.curry((f, functor) => {
  if(R.is(Container, functor)) {
     return functor.map(f)
  } else {
     return __map(f, functor)
  }
})

module.exports = R
