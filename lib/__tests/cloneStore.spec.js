const Memorux = require('../')

describe("Clone store", () => {

  it("should return new store into onChange callback", () => {

    class PostStore {

      constructor() {
        this.state = [
          { id: 0, name: 'Hello world!' },
        ]
      }

      dispatch(state, action) {
        switch(action.name) {
          case 'POST_ADD_GOOD_MORNING':
            return [
              ...state,
              { id: 1, name: 'Good morning!' }
            ]
            break
          case 'POST_ADD_HAPPY_NEW_YEAR':
            return [
              ...state,
              { id: 2, name: 'Happy new year!' }
            ]
            break
        }
      }
    }

    let counter = 0
    let history = []
    let memorux = new Memorux
    memorux.assignStores({ PostStore })
    memorux.onChange = (store) => {
      history[counter++] = store
    }
    memorux.dispatch({ name: 'POST_ADD_GOOD_MORNING'})
    memorux.dispatch({ name: 'POST_ADD_HAPPY_NEW_YEAR'})
    history.forEach((store, index) => {
      switch(index) {
        case 0:
          expect(store.PostStore.length).toEqual(2)
          break
        case 1:
          expect(store.PostStore.length).toEqual(3)
          break
      }
    })


  })

})
