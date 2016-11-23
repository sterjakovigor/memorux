import Memorux from '../src/lib/Memorux'

describe("Delayed actions", () => {

  it("should insert new quote after timeout", (done) => {

    class QuoteStore {

      initialState = [
        {
          author: 'Ричард Бах',
          description: 'Твой учитель — это не тот, кто тебя учит, а тот, у кого учишься ты.',
        }
      ]

      dispatch(state, action) {
        switch (action.name) {
          case 'ADD_NEW_QUOTE':
            let data = action.data
            let newQuotes = [
              ...state,
              {
                author:      data.author,
                description: data.description,
              }
            ]
            return function(resolve, reject) {
              setTimeout(function() {
                resolve(newQuotes)
              }, 100)
            }
            break
          default:
            return state
        }
      }

    }

    let memorux = new Memorux()
    memorux.assignStores({ QuoteStore })

    expect(memorux.stores.QuoteStore.length).toEqual(1)

    memorux.onChange = (store) => {
      expect(store.QuoteStore.length).toEqual(2)
      done()
    }

    memorux.dispatch({
      name: 'ADD_NEW_QUOTE',
      data: {
        author: 'Вадим Зеланд',
        description: 'Счастье — не в пункте назначения, а в пути!'
      }
    })

  })


})
