var fpu = require('./exports');
var R = fpu.R
var C = fpu.C
var U = fpu.U
var getProp = fpu.getProp

Object.prototype.log = function() {
  if(console) {
    console.log(this)
  }
}
var obj = {
  id: 1,
  name: 'Object',
  config: {
    label: 'object',
    color: 'red'
  }
}

var obj2 = {
  config: {
    label: 'obj2',
  }
}

var colorTB = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF'
}

var getObjCfgColor = getProp('config.color')
var getColorValue = getProp(R.__, colorTB)
var getObjColorValue = R.compose(getColorValue, getObjCfgColor)

var handleRight = U.getValue
var handleLeft = R.curry((color, either) => color)

var colorValue = U.either(handleLeft('#000000'), handleRight, getObjColorValue(obj2)).log()
