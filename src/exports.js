import {cloneDeep} from 'lodash'
import R from './Utils/fp'
import {Container} from './classes/Containers'
import U from './Utils/utils'

// Container -> Container -> Either(Left, Right)
const getProp = R.curry((prop_Container, obj_Container) => {
  if(!R.is(Container, prop_Container)) {
    prop_Container = Container.of(prop_Container)
  }
  if(!R.is(Container, obj_Container)) {
    obj_Container = Container.of(obj_Container)
  }
  let targetValue_Maybe = U.prop(prop_Container, obj_Container)
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

export {
  getProp,
  U as C,
  R
}
