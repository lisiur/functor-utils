var _ = require('lodash')
var R = require('./utils/fp')
var C = require('./classes/containers')
var U = require('./utils/utils')

var Container = C.Container
var cloneDeep = _.cloneDeep

// Container -> Container -> Either(Left, Right)
var prop = R.curry((prop_Container, obj_Container) => {
  if(!R.is(Container, prop_Container)) {
    prop_Container = Container.of(prop_Container)
  }
  if(!R.is(Container, obj_Container)) {
    obj_Container = Container.of(obj_Container)
  }
  var targetValue_Maybe = U.prop(prop_Container, obj_Container)
  if(targetValue_Maybe.isNil()) {
    return U.Left({
      code: 'PROP_CANNOT_BE_FOUND',
      track: {
        obj: cloneDeep(obj_Container.__value),
        prop: prop_Container.__value
      }
    })
  } else {
    return U.Right(targetValue_Maybe.__value)
  }
})

var propWithDefault = R.curry((prop_Container, defaultVal, obj_Container) => {
  return U.either(U.id(defaultVal), U.getValue, prop(prop_Container, obj_Container))
})

module.exports = {
  C: C,
  R: R,
  U: U,
  prop: prop,
  propWithDefault: propWithDefault
}
