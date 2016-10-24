import Memorux from '../src/lib/Memorux'

describe("Memorux", () => {

  it("initial store should be overridden by initialState of defined store class", () => {

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
    expect(memorux.store.DuckStore.length).toEqual(1)
    memorux.assignStores({ DuckStore })
    expect(memorux.store.DuckStore.length).toEqual(3)

  })

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

    expect(memorux.store.QuoteStore.length).toEqual(1)

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

  it("should update settings name", () => {

    class SettingsStore {

      initialState = {
        name: null
      }

      dispatch(state, action) {
        switch (action.name) {
          case 'UPDATE_SETTINGS_NAME':
            return {
              name: action.data.name
            }
            break
          default:
            return state
        }
      }

    }

    let memorux = new Memorux
    memorux.assignStores({ SettingsStore })

    expect(memorux.store.SettingsStore.name).toBe(null)

    memorux.onChange = (store) => {
      expect(store.SettingsStore.name).not.toBe(null)
    }

    memorux.dispatch({
      name: 'UPDATE_SETTINGS_NAME',
      data: {
        name: 'Igor Sterjakov'
      }
    })

  })

  it("should insert new post", () => {

    class PostStore {

      initialState = [
        { name: 'hello', description: 'world' }
      ]

      dispatch(state, action) {
        switch (action.name) {
          case 'ADD_EXAMPLE_POST':
            return [
              ...state,
              { name: 'example', description: 'post' }
            ]
            break
          default:
            return state
        }
      }

    }

    let memorux = new Memorux
    memorux.assignStores({ PostStore })

    expect(memorux.store.PostStore.length).toEqual(1)

    memorux.onChange = (store) => {
      expect(store.PostStore.length).toEqual(2)
    }

    memorux.dispatch({
      name: 'ADD_EXAMPLE_POST',
    })


  })

})
