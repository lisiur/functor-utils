var R = require('./src/utils/ramda')
var C = require('./src/classes')
var U = require('./src/utils')
var prop = require('./src/prop')
var propWithDefault = require('./src/propWithDefault')

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

var getObjCfgColor = prop('config.color')
var getColorValue = prop(R.__, colorTB)
var getObjColorValue = R.compose(getColorValue, getObjCfgColor)

var handleRight = U.getValue
var handleLeft = R.curry((color, either) => color)

U.either(handleLeft('#000000'), handleRight, getObjColorValue(obj2)).log()
propWithDefault('config.color', '#000000', obj2).log()
