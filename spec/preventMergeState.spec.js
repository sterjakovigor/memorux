import Memorux from '../src/lib/Memorux'

describe("Prevent merge state when store", () => {

  it("dispatch method return undefined", () => {
    class DuckStore {
      initialState = [
        { name: 'Marry' },
      ]

      dispatch(store, action) {
      }
    }

    let memorux = new Memorux()
    memorux.assignStores({ DuckStore })
    memorux.dispatch({ name: 'SOME_ACTION' })
    expect(memorux.stores.DuckStore.length).toEqual(1)
  })

  it("store doesn's have dispatch method", () => {
      class DuckStore {
        initialState = [
          { name: 'Marry' },
        ]
      }

      let memorux = new Memorux()
      memorux.assignStores({ DuckStore })
      memorux.dispatch({ name: 'SOME_ACTION' })
      expect(memorux.stores.DuckStore.length).toEqual(1)
  })

})
