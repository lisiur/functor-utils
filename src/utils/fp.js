const R = require('ramda')
const Container = require('../classes/Containers').Container

const __map = R.map
R.map = R.curry((f, functor) => {
  if(R.is(Container, functor)) {
     return functor.map(f)
  } else {
     return __map(f, functor)
  }
})

module.exports = R
