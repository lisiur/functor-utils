import {getProp, C, R} from './exports'

Object.prototype.log = function() {
  if(console) {
    console.log(this)
  }
}
let obj = {
  id: 1,
  name: 'Object',
  config: {
    label: 'object',
    color: 'red'
  }
}

let obj2 = {
  config: {
    label: 'obj2',
  }
}

let colorTB = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF'
}

const getObjCfgColor = getProp('config.color')
const getColorValue = getProp(R.__, colorTB)
const getObjColorValue = R.compose(getColorValue, getObjCfgColor)

const handleRight = C.getValue
const handleLeft = R.curry((color, either) => color)

const colorValue = C.either(handleLeft('#000000'), handleRight, getObjColorValue(obj)).log()
