import R from 'ramda'
import _ from 'lodash'

import {Container, ID, Maybe, Either, Left, Right} from '../classes/Containers'

const Utils = {
  Container: (x) => Container.of(x),
  ID: (x) => ID.of(x),
  Maybe: (x) => Maybe.of(x),
  Either: (x) => Either.of(x),
  Left: (x) => Left.of(x),
  Right: (x) => Right.of(x),

  prop: R.curry((prop_Container, obj_Container) => {
    if(obj_Container.constructor === Left) {
      return Maybe.of(obj_Container)
    }
    if(prop_Container.constructor === Left) {
      return Maybe.of(prop_Container)
    }
    if(prop_Container.isNil() || obj_Container.isNil()) {
      return Maybe.of(null)
    }
    let target_Maybe = Maybe.of(obj_Container.__value)
    let propFormat = prop_Container.__value
    propFormat.split('.').forEach(prop => {
      target_Maybe = R.map(R.prop(prop), target_Maybe)
    })
    return target_Maybe
  }),

  getValue: (container) => {
    return container.__value
  },
  either: R.curry((f, g, e) => {
    switch(e.constructor) {
      case Left: return f(e)
      case Right: return g(e)
    }
  })
}

export default Utils
