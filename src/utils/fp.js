var R = require('ramda')
var Container = require('../classes/Containers').Container

var __map = R.map
R.map = R.curry((f, functor) => {
  if(R.is(Container, functor)) {
     return functor.map(f)
  } else {
     return __map(f, functor)
  }
})

module.exports = R
