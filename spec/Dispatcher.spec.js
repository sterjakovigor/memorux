import Store      from '../src/lib/Store'
import Dispatcher from '../src/lib/Dispatcher'

describe("Dispatcher", () => {

  class Example1Store extends Store { _collection = { counter_0: 0 } }
  class Example2Store extends Store { _collection = { counter_1: 0 } }
  class Example3Store extends Store { _collection = { counter_2: 0 } }

  let exampleStores = [ Example1Store, Example2Store, Example3Store ]

  it("should assign collection", () => {
    let dispatcher, stores
    dispatcher = new Dispatcher
    dispatcher.stores = exampleStores
    expect(dispatcher.stores).toBe(exampleStores)
  })

  it("should assign stores", () => {
    let dispatcher, exampleCollection
    exampleCollection = { counter_0: 0 }
    dispatcher = new Dispatcher
    dispatcher.collection = exampleCollection
    expect(dispatcher.collection).toBe(exampleCollection)
  })

  it("dispatch() should return updated collection for multiple stores", () => {

    let dispatcher, dispatch

    dispatch = function (action, payload = {}) {
      switch (action) {
        case 'INCREASE_COUNTER':
          let key = Object.keys(this.collection)[0]
          let newCounter = this.collection[key] + payload.increaseBy
          return { [key]: newCounter }
          break
      }
    }

    Example1Store.prototype.dispatch = dispatch
    Example2Store.prototype.dispatch = dispatch
    Example3Store.prototype.dispatch = dispatch

    dispatcher = new Dispatcher(exampleStores)

    let beforeDispatch = 0, afterDispatch = 0

    for (let i = 0; i < 3; i++) {
      beforeDispatch += dispatcher.collection[`counter_${i}`]
    }

    expect(beforeDispatch).toBe(0)

    dispatcher.dispatch("INCREASE_COUNTER", { increaseBy: 1 })

    for (let i = 0; i < 3; i++) {
      afterDispatch += dispatcher.collection[`counter_${i}`]
    }

    expect(afterDispatch).toBe(3)

  })

})
