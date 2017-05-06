var R = require('./utils/ramda')
var U = require('./utils')
var prop = require('./prop')

var propWithDefault = R.curry((prop_Container, defaultVal, obj_Container) => {
  return U.either(U.id(defaultVal), U.getValue, prop(prop_Container, obj_Container))
})

module.exports = propWithDefault
