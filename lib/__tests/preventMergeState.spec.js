const Memorux = require('../')

describe("Prevent merge state when store", () => {

  it("dispatch method return undefined", () => {

    class DuckStore {

      constructor() {
        this.state = [
          { name: 'Marry' },
        ]
      }

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

        constructor() {
          this.state = [
            { name: 'Marry' },
          ]
        }

      }

      let memorux = new Memorux()
      memorux.assignStores({ DuckStore })
      memorux.dispatch({ name: 'SOME_ACTION' })
      expect(memorux.stores.DuckStore.length).toEqual(1)
  })

})
