const Memorux = require('../')

describe("Store instance", () => {

  it("should living after dispatch", () => {

    class PostStore {

      constructor() {
        this.state = []
        this.id = 0
      }

      dispatch(state, action) {
        switch(action.name) {
          case 'POST_ADD':
            return [
              ...state,
              {
                id: this.id++,
                ...action.data
              }
            ]
            break
        }
      }
    }

    let counter = 0
    const memorux = new Memorux
    memorux.assignStores({ PostStore })
    memorux.onChange = (store) => {
      expect(store.PostStore[counter].id).toEqual(counter++)
    }
    memorux.dispatch({ name: 'POST_ADD', data: { name: 'first post'}})
    memorux.dispatch({ name: 'POST_ADD', data: { name: 'second post'}})
  })

})
