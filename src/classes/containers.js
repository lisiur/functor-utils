class Container{
  constructor(x) {
    this.__value = x
  }

  isNil() {
    return this.__value === null || this.__value === undefined || this.__value.constructor === Left
  }

  map(f) {
    return Container.of(f(this.__value))
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

class Right extends Either {
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

module.exports = {
  Container: Container,
  ID: ID,
  Maybe: Maybe,
  Either: Either,
  Left: Left,
  Right: Right
}
