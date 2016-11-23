import Memorux from '../src/lib/Memorux'

describe("Initial store", () => {

  it(" should be overridden by initialState of defined store class", () => {

    let initialStore = {
      DuckStore: [{ id: 0, name: 'Helen' }]
    }

    class DuckStore {
      initialState = [
        {id: 0, name: 'Gloria'   },
        {id: 1, name: 'Victoria' },
        {id: 2, name: 'Sofia'    }
      ]
    }

    let memorux = new Memorux(initialStore)
    expect(memorux.stores.DuckStore.length).toEqual(1)
    memorux.assignStores({ DuckStore })
    expect(memorux.stores.DuckStore.length).toEqual(3)

  })


})
