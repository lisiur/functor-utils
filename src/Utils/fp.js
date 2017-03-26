import R from 'ramda'
import {Container} from '../classes/Containers'

const __map = R.map
R.map = R.curry((f, functor) => {
  if(R.is(Container, functor)) {
     return functor.map(f)
  } else {
     return __map(f, functor)
  }
})

export default R
