import R from 'ramda'
import _ from 'lodash'

const __map = R.map
R.map = R.curry((f, functor) => {
	let topConstructor = Object.constructor
	let cls = functor.constructor
	while(cls !== topConstructor) {
		if(cls === Container) {
			return functor.map(f)
		} else {
			cls = cls.constructor
		}
	}
	return __map(f, functor)
})

Object.prototype.log = function() {
	if(console) {
		console.log(this)
	}
}

const Utils = {
	getProp: R.curry((prop_Container, obj_Container) => {
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
	either: (either) => {
		return new Promise((resolve, reject) => {
            switch(either.constructor) {
            	case Left: reject(either)
            	case Right: resolve(either)
            }
		})
	}
}

/**
 * Container
 * @param {*}
 */
class Container {
	constructor(x) {
		this.__value = x
	}

	map(f) {
		return new this.constructor(f(this.__value))
	}

	isNil() {
		return this.__value === null || this.__value === undefined || this.__value.constructor === Left
	}

	static of(x) {
		return new Container(x)
	}
}

class ID extends Container{
	constructor(x) {
        super(x)
	}

	static of(x) {
		return x
	}
}

/**
 * Maybe
 * @param {*}
 */
class Maybe extends Container{
	constructor(x) {
		super(x)
	}
	
	map(f) {
		return this.isNil() ? this : Maybe.of(f(this.__value))
	}

	static of(x) {
        return new Maybe(x)
	}
}

// Either
class Either extends Container{
	constructor(x) {
        super(x)
	}

	static of(x) {
		return new Either(x)
	}

	static either(f, g, e) {
        switch(e.constructor) {
        	case Left: return f(e)
        	case Right: return g(e)
        }
	}
}

class Left extends Either {
	constructor(x) {
		super(x)
	}

	map(f) {
		return this
	}

	static of(x) {
		return new Left(x)
	}
}

class Right extends Either { // Right的值总为Maybe
	constructor(x) {
		super(x)
	}

	map(f) {
		return Right.of(f(this.__value))
	}

	static of(x) {
		return new Right(x)
	}
}

// Container -> Container -> Either(Left, Right)
const getProp = R.curry((prop_Container, obj_Container) => {
	let targetValue_Maybe = Utils.getProp(prop_Container, obj_Container)
	if(targetValue_Maybe.isNil()) {
        return Left.of({
        	code: 'PROP_CANNOT_BE_FOUND', 
        	track: {
        		obj: _.cloneDeep(obj_Container.__value), 
        		prop: prop_Container.__value
        	}
        })
	} else {
		return Right.of(targetValue_Maybe.__value)
	}
})

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
const getObjCfgColor = getProp(Container.of('config.color'))
const getColorValue = getProp(R.__, Container.of(colorTB))
const getObjColorValue = R.compose(getColorValue, getObjCfgColor, Container.of)

const handleRight = Utils.getValue
const handleLeft = R.curry((color, either) => color)

const colorValue = Either.either(handleLeft('#000000'), handleRight, getObjColorValue(obj)).log()

// Promise 式
Utils.either(getObjCfgColor(Container.of(obj2)))
.then(either => {
	return Utils.either(getColorValue(either))
})
.then(either => {
	log('success', Utils.getValue(either))
})
.catch(either => {
	log('fail', Utils.getValue(either))
})

